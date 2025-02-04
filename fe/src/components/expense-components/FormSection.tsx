import { UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";

interface FormSectionProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: string;
}

export default function FormSection({ label, name, type = "text", placeholder, register, error }: FormSectionProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <Input type={type} placeholder={placeholder} {...register(name)} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
