import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useExpenseStore } from "../../store/useExpenseStore";
import { Card } from "../ui/card";

export default function DashboardComponent() {
  const { expenses, fetchExpenses } = useExpenseStore();
  const [filters, setFilters] = useState({ category: "", startDate: "", endDate: "" });

  useEffect(() => {
    fetchExpenses(filters);
  }, [fetchExpenses, filters]);

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>

      {/* Filter Section */}
      <div className="flex gap-4 my-4">
        <Input placeholder="Filter by Category" onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
        <Input type="date" onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
        <Input type="date" onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
      </div>

      {/* Expense List */}
      <Card>
        <h3 className="font-semibold">Expenses</h3>
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id} className="border p-2">{expense.category}: ${expense.amount}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
