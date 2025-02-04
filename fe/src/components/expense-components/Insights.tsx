import { useEffect, useState } from "react";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";
import { useExpenseStore } from "../../store/useExpenseStore";
import { Input } from "../ui/input";
import { Card } from "../ui/card";

export default function Insights() {
  const { insights, fetchInsights } = useExpenseStore();
  const [filters, setFilters] = useState({ startDate: "", endDate: "", category: "" });

  useEffect(() => {
    fetchInsights(filters);
  }, [filters]);

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Spending Insights</h2>

      {/* Filters */}
      <div className="flex gap-4 my-4">
        <Input type="date" onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
        <Input type="date" onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
        <Input placeholder="Filter by Category" onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Pie Chart */}
        <Card>
          <h3 className="font-semibold">Category-wise Spending</h3>
          <PieChart width={300} height={300}>
            <Pie data={insights} dataKey="total" nameKey="_id" outerRadius={100}>
              {insights.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Card>

        {/* Bar Chart */}
        <Card>
          <h3 className="font-semibold">Spending Breakdown</h3>
          <BarChart width={400} height={300} data={insights}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#36A2EB" />
          </BarChart>
        </Card>
      </div>
    </div>
  );
}
