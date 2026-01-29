"use client";

import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip } from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface OrderStatusChartProps {
  data: {
    status: string;
    count: number;
    percentage: number;
  }[];
}

export function OrderStatusChart({ data }: OrderStatusChartProps) {
  const colors: Record<string, string> = {
    PROCESSING: "#e76e50",
    SHIPPED: "#2a9d8f",
    DELIVERED: "#264653",
    CANCELLED: "#e63946",
  };

  const chartData = data.map((item) => ({
    ...item,
    fill: colors[item.status] ?? "hsl(var(--muted))",
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
