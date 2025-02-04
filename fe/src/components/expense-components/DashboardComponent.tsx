import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useExpenseStore } from "../../store/useExpenseStore";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import CreateExpenseModal from "./CreateExpenseModal"; 

export default function DashboardComponent() {
  const { expenses, fetchExpenses, deleteExpense } = useExpenseStore();
  const [filters, setFilters] = useState({ category: "", startDate: "", endDate: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchExpenses(filters);
  }, [filters, fetchExpenses]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Expense Tracker</h2>

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
            <li key={expense._id} className="flex justify-between border p-2 items-center">
              <div className="flex items-center gap-2">
                <CategoryTags category={expense.category} />
                <span>${expense.amount}</span>
              </div>
              <Button variant="destructive" onClick={() => deleteExpense(expense._id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </Card>

      {/* Add Expense Button */}
      <div className="flex justify-center mt-4">
        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Expense
        </Button>
      </div>

      {/* Expense Modal */}
      {isModalOpen && <CreateExpenseModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

function CategoryTags({ category }: { category: string }) {
  const categories = category.split("/").map((cat) => cat.trim());

  return (
    <div className="flex gap-2">
      {categories.map((cat, index) => (
        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
          {cat}
        </span>
      ))}
    </div>
  );
}
