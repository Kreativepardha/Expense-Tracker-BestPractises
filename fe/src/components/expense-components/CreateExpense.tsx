import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useExpenseStore } from "../../store/useExpenseStore";

export default function CreateExpense() {
  const { addExpense, fetchExpenses } = useExpenseStore();
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expense.amount || !expense.category || !expense.date) {
      alert("Amount, category, and date are required!");
      return;
    }

    await addExpense({
      amount: parseFloat(expense.amount),
      category: expense.category,
      date: new Date(expense.date).toISOString(),
      description: expense.description,
    });

    fetchExpenses({}); // Refresh expenses after adding
    setExpense({ amount: "", category: "", date: "", description: "" }); // Clear form
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="category"
          placeholder="Category"
          value={expense.category}
          onChange={handleChange}
          required
        />
        <Input type="date" name="date" value={expense.date} onChange={handleChange} required />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={expense.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Expense
        </Button>
      </form>
    </div>
  );
}
