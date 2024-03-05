"use client";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./ui/admin-sidebar";

function Home() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const {user} = useAppSelector((state) => state.auth);
  const router = useRouter();
  
  console.log(user);
  

  useEffect(() => {
    // Redirecciona si no está autenticado
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <div className="dashboard">
        <h1 className="text-black">Dasboard</h1>
      </div>
    </>
  );
}

export default Home;