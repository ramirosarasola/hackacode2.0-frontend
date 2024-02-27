"use client";
import InputField from "@/app/ui/label-input";
import { loginSchema } from "@/app/validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginInputs {
  username: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-blue rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Log In</h1>
      <form id="auth-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <InputField
          type="text"
          id="username"
          label="Username"
          zodMethod={register}
          errors={errors}
          autoComplete="username"
        />
        <InputField
          type="password"
          id="password"
          label="Password"
          zodMethod={register}
          errors={errors}
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
}