import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSection from "./FormSection";
import expenseFields from "../../data/expenseFields.json";
import { useExpenseStore } from "../../store/useExpenseStore";
import { Button } from "../ui/button";

const expenseSchema = z.object({
  amount: z.coerce.number().positive("Amount must be a positive number"),
  category: z.string().min(1, "Category is required"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  description: z.string().optional(),
});

interface ExpenseFormProps {
  onClose: () => void;
  defaultValues?: any;
}

export default function ExpenseForm({ onClose, defaultValues }: ExpenseFormProps) {
  const { addExpense, updateExpense } = useExpenseStore();
  const isEditing = !!defaultValues;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: defaultValues || {
      amount: "",
      category: "",
      date: "",
      description: "",
    },
  });

  const onSubmit = async (data: any) => {
    if (isEditing) {
      await updateExpense(defaultValues._id, data);
    } else {
      await addExpense(data);
    }
    onClose();
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{isEditing ? "Edit Expense" : "Add Expense"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {expenseFields.expenseFields.map((field) => (
          <FormSection key={field.name} {...field} register={register} error={errors[field.name]?.message} />
        ))}
        <div className="flex justify-between">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">{isEditing ? "Update" : "Add"}</Button>
        </div>
      </form>
    </div>
  );
}
