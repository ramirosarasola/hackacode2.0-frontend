"use client";
import { useEffect } from "react";
import AdminDashboardHeader from "../ui/admin-dashboard-header";
import Sidebar from "../ui/admin-sidebar";
import { loadUser } from "@/lib/slices/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRequireAuth } from "../(auth)/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  useRequireAuth();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="admin-layout min-h-screen flex">
      <Sidebar />
      <div className="admin-content flex-1">
        <AdminDashboardHeader />
        <div className="admin-pages w-full min-h-[90vh] px-10">{children}</div>
      </div>
    </div>
  );
}
