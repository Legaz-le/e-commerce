"use client";

import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TopProductsChartProps {
  data: {
    productName: string;
    totalQuantity: number;
  }[];
}

export function TopProductsChart({ data }: TopProductsChartProps) {
  const formattedData = data.map((item) => ({
    name:
      item.productName.length > 20
        ? item.productName.slice(0, 17) + "..."
        : item.productName,
    totalQuantity: item.totalQuantity,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={120} />
              <Tooltip />
              <Bar dataKey="totalQuantity" fill="#2a9d8f" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
