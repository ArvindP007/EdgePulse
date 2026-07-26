import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { login } from "../services/authService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const saveLogin = useAuthStore((s) => s.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await login(values);

      saveLogin(response);

      toast.success("Logged in");

      navigate("/");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Invalid email or password";

      toast.error(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 rounded-lg border p-6 shadow"
        noValidate
      >
        <h2 className="mb-6 text-2xl font-semibold">EdgePulse Login</h2>

        <label className="mb-2 block text-sm font-medium">Email</label>
        <Input
          className="mb-2"
          placeholder="Email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email ? (
          <p className="mb-2 text-sm text-destructive">{errors.email.message}</p>
        ) : null}

        <label className="mb-2 block text-sm font-medium">Password</label>
        <Input
          className="mb-4"
          type="password"
          placeholder="Password"
          {...register("password")}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password ? (
          <p className="mb-2 text-sm text-destructive">{errors.password.message}</p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-blue-600 p-2 text-white disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}