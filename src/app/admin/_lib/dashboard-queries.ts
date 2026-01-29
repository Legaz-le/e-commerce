import prisma from "@/lib/prisma";

function getStartDate(timeRange: string) {
  const now = new Date();
  switch (timeRange) {
    case "7d":
      now.setDate(now.getDate() - 7);
      break;
    case "30d":
      now.setDate(now.getDate() - 30);
      break;
    case "90d":
      now.setDate(now.getDate() - 90);
      break;
    case "1y":
      now.setFullYear(now.getFullYear() - 1);
  }
  return now;
}

function getPreviousPeriodStart(timeRange: string) {
  const now = new Date();
  switch (timeRange) {
    case "7d":
      now.setDate(now.getDate() - 14);
      break;
    case "30d":
      now.setDate(now.getDate() - 60);
      break;
    case "90d":
      now.setDate(now.getDate() - 180);
      break;
    case "1y":
      now.setFullYear(now.getFullYear() - 2);
  }
  return now;
}

type RawResult = {
  period: Date;
  revenue: bigint;
  order_count: bigint;
};

export async function getSalesTrends(timeRange: string, granularity: string) {
  const startDate = getStartDate(timeRange);
  const interval =
    granularity === "daily"
      ? "day"
      : granularity === "weekly"
        ? "week"
        : "month";

  const results = await prisma.$queryRaw<RawResult[]>`
    SELECT
      DATE_TRUNC(${interval}, "createdAt") as period,
      SUM("totalPaidInCents") as revenue,
      COUNT(*) as order_count
    FROM "Order"
    WHERE "createdAt" >= ${startDate}
       AND "status" != 'CANCELLED'
    GROUP BY period
    ORDER BY period ASC
    `;

  return results.map((row) => ({
    date: row.period.toISOString(),
    revenue: Number(row.revenue) / 100,
    orderCount: Number(row.order_count),
  }));
}

export async function getOrderStatusBreakdown(timeRange: string) {
  const startDate = getStartDate(timeRange);
  const getDate = await prisma.order.groupBy({
    by: ["status"],
    where: { createdAt: { gte: startDate } },
    _count: { id: true },
  });

  const total = getDate.reduce((sum, r) => sum + r._count.id, 0);

  return getDate.map((row) => ({
    status: row.status,
    count: row._count.id,
    percentage: total > 0 ? (row._count.id / total) * 100 : 0,
  }));
}

export async function getTopSellingProducts(
  timeRange: string,
  limit: number = 10,
) {
  const startDate = getStartDate(timeRange);
  const result = await prisma.orderItem.groupBy({
    by: ["productId"],
    where: {
      order: { createdAt: { gte: startDate }, status: { not: "CANCELLED" } },
    },
    _sum: { quantity: true, priceInCents: true },
    orderBy: { _sum: { quantity: "desc" } },
    take: limit,
  });

  const productIds = result.map((r) => r.productId);

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
    select: { id: true, name: true },
  });

  const productMap = new Map(products.map((p) => [p.id, p.name]));

  return result.map((row) => ({
    productId: row.productId,
    productName: productMap.get(row.productId) ?? "Unknown",
    totalQuantity: row._sum.quantity ?? 0,
    totalRevenue: (row._sum.priceInCents ?? 0) / 100,
  }));
}

export async function getRevenueMetrics(timeRange: string) {
  const startDate = getStartDate(timeRange);
  const previousStartDate = getPreviousPeriodStart(timeRange);

  const [current, previos] = await Promise.all([
    prisma.order.aggregate({
      where: {
        createdAt: { gte: startDate },
        status: { not: "CANCELLED" },
      },
      _sum: { totalPaidInCents: true },
      _count: { id: true },
      _avg: { totalPaidInCents: true },
    }),

    prisma.order.aggregate({
      where: {
        createdAt: { gte: previousStartDate, lt: startDate },
        status: { not: "CANCELLED" },
      },
      _sum: { totalPaidInCents: true },
      _count: { id: true },
    }),
  ]);
  const currentRevenue = (current._sum.totalPaidInCents ?? 0) / 100
  const previousRevenue = (previos._sum.totalPaidInCents ?? 0) / 100
  const currentOrders = current._count.id
  const previousOrders = previos._count.id
  
  const revenueGrowth = previousRevenue > 0 
    ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
    : 0
  
  const ordersGrowth = previousOrders > 0
    ? ((currentOrders - previousOrders) / previousOrders) * 100
    : 0
  
  return {
    totalRevenue: currentRevenue,
    totalOrders: currentOrders,
    averageOrderValue: (current._avg.totalPaidInCents ?? 0) / 100,
    revenueGrowth,
    ordersGrowth,
  }
}
