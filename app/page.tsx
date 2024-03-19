'use client';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AuthWelcome from "./ui/auth-welcome";
import LoginForm from "./ui/login/login-form";
import { useRouter } from "next/navigation";
import { loadUser } from "@/lib/slices/authSlice";
import { useAppDispatch } from "@/lib/hooks";

export default function Auth() {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const isLoading = useSelector((state) => state.auth.isLoading)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUser())
    }
  }, [dispatch])

  
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  if (localStorage.getItem('token') && isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <section className="bg-secondary flex justify-end w-full h-[100vh]">
      {/* Welcome Container */}
      <div className="welcome w-[40%] h-[60%] m-auto flex items-end justify-start">
        {/* Title Component */}
        <AuthWelcome
          title="Welcome Back!"
          description="Welcome to our exclusive employee portal! Designed to streamline
              the sale of our travel products. This intuitive tool will enhance
              your ability to offer unique experiences."
        />
      </div>

      {/* Form Container */}
      <div className="login bg-white w-[50vw] h-[100vh] rounded-l-3xl flex items-center justify-center">
        <LoginForm />
      </div>
    </section>
  );
}
