import { create } from "zustand";
import { api } from "../lib/api";

interface Expense {
  _id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

interface Insight {
  _id: string; // Category name or another grouping key
  total: number; // Total amount spent in that category
}

interface ExpenseState {
  expenses: Expense[];
  insights: Insight[];
  fetchExpenses: (filters: { category: string; startDate: string; endDate: string }) => Promise<void>;
  fetchInsights: (filters: { category: string; startDate: string; endDate: string }) => Promise<void>;
  addExpense: (expense: Omit<Expense, "_id">) => Promise<void>;
  updateExpense: (id: string, updatedExpense: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  insights: [],

  fetchExpenses: async (filters = { category: "", startDate: "", endDate: "" }) => {
    const res = await api.get("/expenses", { params: filters });
    set({ expenses: res.data.expenses });
  },

  fetchInsights: async (filters = { category: "", startDate: "", endDate: "" }) => {
    const res = await api.get("/insights", { params: filters }); // Make sure your backend has an `/insights` endpoint
    set({ insights: res.data.insights });
  },

  addExpense: async (expense) => {
    const res = await api.post("/expenses", expense);
    set({ expenses: [...get().expenses, res.data] });
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
