import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { formatNumber, formatCurrency } from "@/lib/formater";
import { TimeRangeFilter } from "./_components/charts/TimeRangeFilter";
import { SalesChart } from "./_components/charts/SalesChart";
import { OrderStatusChart } from "./_components/charts/OrderStatusChart";
import { TopProductsChart } from "./_components/charts/TopProductsChart";
import {
  getSalesTrends,
  getOrderStatusBreakdown,
  getTopSellingProducts,
  getRevenueMetrics,
} from "./_lib/dashboard-queries";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ range?: string }>;
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { totalPaidInCents: true },
    }),
  ]);
  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.totalPaidInCents || 0) / userCount / 100,
  };
}

export default async function AdminDashboard({ searchParams }: PageProps) {
  const userData = await getUserData();

  const params = await searchParams;
  const timeRange = params.range ?? "30d";
  const granularity =
    timeRange === "7d" || timeRange === "30d" ? "daily" : "weekly";

  const [salesTrends, orderStatus, topProducts, metrics] = await Promise.all([
    getSalesTrends(timeRange, granularity),
    getOrderStatusBreakdown(timeRange),
    getTopSellingProducts(timeRange, 10),
    getRevenueMetrics(timeRange),
  ]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold"> Dashboard </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <TimeRangeFilter />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(metrics.totalRevenue)}
            </div>
            <p
              className={
                metrics.revenueGrowth >= 0
                  ? "text-green-600 text-xs"
                  : "text-red-600 text-xs"
              }
            >
              {metrics.revenueGrowth >= 0 ? "+" : ""}
              {metrics.revenueGrowth.toFixed(1)}% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(metrics.totalOrders)}
            </div>
            <p
              className={
                metrics.ordersGrowth >= 0
                  ? "text-green-600 text-xs"
                  : "text-red-600 text-xs"
              }
            >
              {metrics.ordersGrowth >= 0 ? "+" : ""}
              {metrics.ordersGrowth.toFixed(1)}% from previous period
            </p>
          </CardContent>
        </Card>
        <DashboardCard
          title="Avg Order Value"
          subtitle="Per transaction"
          body={formatCurrency(metrics.averageOrderValue)}
        />
        <DashboardCard
          title="Customers"
          subtitle={`${formatCurrency(userData.averageValuePerUser)} Average Value`}
          body={formatNumber(userData.userCount)}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SalesChart data={salesTrends} />
        <OrderStatusChart data={orderStatus} />
      </div>
      <div className="mb-6">
        <TopProductsChart data={topProducts} />
      </div>
    </>
  );
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
