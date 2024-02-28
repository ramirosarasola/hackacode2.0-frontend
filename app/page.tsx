"use client";

import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

  return <>{isAuthenticated ? <div>Dashboard</div> : null}</>;
}

export default Home;