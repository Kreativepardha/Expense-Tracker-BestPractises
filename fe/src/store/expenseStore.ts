import { create } from "zustand";
import { api } from "../lib/api";

interface Expense {
  _id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

interface ExpenseState {
  expenses: Expense[];
  fetchExpenses: () => Promise<void>;
  addExpense: (expense: Omit<Expense, "_id">) => Promise<void>;
  updateExpense: (id: string, updatedExpense: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],

  fetchExpenses: async () => {
    const res = await api.get("/expenses");
    set({ expenses: res.data.expenses });
  },

  addExpense: async (expense) => {
    const res = await api.post("/expenses", expense);
    set({ expenses: [...get().expenses, res.data.expense] });
  },

  updateExpense: async (id, updatedExpense) => {
    const res = await api.put(`/expenses/${id}`, updatedExpense);
    set({
      expenses: get().expenses.map((exp) => (exp._id === id ? res.data.expense : exp)),
    });
  },

  deleteExpense: async (id) => {
    await api.delete(`/expenses/${id}`);
    set({ expenses: get().expenses.filter((exp) => exp._id !== id) });
  },
}));
