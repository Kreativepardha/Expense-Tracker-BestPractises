import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center bg-slate-900/80 h-screen">
    <div className="max-w-md mx-auto p-6 bg-white border">
      <h2 className="text-3xl font-extrabold">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Input type="password" placeholder="Password" {...register("password")} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <Button type="submit" className="bg-slate-300">Login</Button>
      </form>
    </div>
  </div>
  );
}
