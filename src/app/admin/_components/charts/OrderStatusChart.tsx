"use client";

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

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
    PROCESSING: "hsl(var(--chart-1))",
    SHIPPED: "hsl(var(--chart-2))",
    DELIVERED: "hsl(var(--chart-3))",
    CANCELLED: "hsl(var(--destructive))",
  };
  
  const chartData = data.map((item) => ({
    ...item,
    fill: colors[item.status] ?? "hsl(var(--muted))"
  }))

  return (
    <Card>
      <CardHeader><CardTitle>Order Status</CardTitle></CardHeader>
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
