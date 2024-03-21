"use client";
import AuthFormTitle from "@/app/ui/auth-form-title";
import { AuthInput } from "@/app/ui/auth-input";
import { loginUser } from "@/lib/slices/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

interface IFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = ({ email, password }) => {
    dispatch(loginUser({ email, password })).then((result) => {
      console.log(result.payload);

      if (result.payload) {
        router.push("/admin");
      }
    });
    reset();
  };

  const handleSignIn = () => {
    router.push("/sign-up");
  };

  return (
    <section className="login flex flex-col items-center justify-end gap-14 h-3/5 w-full md:w-2/5">
      <AuthFormTitle size="lg" />
      <form className="flex flex-col items-center justify-center gap-8 w-full">
        <AuthInput
          autoComplete="email"
          type="email"
          label="email"
          register={register}
          required placeholder={"Email"}/>
        <AuthInput
          autoComplete="current-password"
          type="password"
          label="password"
          register={register}
          required
          placeholder={"Password"}
        />
      </form>

      <div className="wrapper flex flex-col items-center justify-center gap-8 w-full">
        <button
          onClick={handleSubmit(onSubmit)}
          className="text-[3vw] md:text-[14px] bg-tertiary text-white py-2 px-4 rounded-full w-full md:w-9/12 h-[15vw] md:h-[51px]"
        >
          Login
        </button>
        <p className="text-[#A8B1CF]">
          Don´t have an account?{" "}
          <Link href="/sign-up" className="text-blue-500 underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;
