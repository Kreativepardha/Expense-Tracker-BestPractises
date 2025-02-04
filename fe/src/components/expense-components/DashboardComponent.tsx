import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useExpenseStore } from "../../store/useExpenseStore";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import CreateExpense from "./CreateExpense";

export default function DashboardComponent() {
  const { expenses, fetchExpenses, deleteExpense } = useExpenseStore();
  const [filters, setFilters] = useState({ category: "", startDate: "", endDate: "" });

  useEffect(() => {
    fetchExpenses(filters);
  }, [filters, fetchExpenses]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Expense Tracker</h2>

      {/* Create Expense Form */}
      <CreateExpense />

      {/* Filters */}
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
            <li key={expense._id} className="flex justify-between border p-2">
              <span>{expense.category}: ${expense.amount}</span>
              <Button variant="destructive" onClick={() => deleteExpense(expense._id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
