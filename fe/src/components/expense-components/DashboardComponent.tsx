import { useExpenseStore } from "../store/expenseStore";
import { useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Card } from "../ui/card";

export default function DashboardComponent() {
  const { expenses, fetchExpenses } = useExpenseStore();

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card>
          <h3 className="font-semibold">Expenses</h3>
          <ul>
            {expenses.map((expense) => (
              <li key={expense._id} className="border p-2">
                {expense.category}: ${expense.amount}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="font-semibold">Spending Insights</h3>
          <PieChart width={300} height={300}>
            <Pie data={expenses} dataKey="amount" nameKey="category" outerRadius={100}>
              {expenses.map((_, index) => (
                <Cell key={index} fill={["#FF6384", "#36A2EB", "#FFCE56"][index % 3]} />
              ))}
            </Pie>
          </PieChart>
        </Card>
      </div>
    </div>
  );
}
