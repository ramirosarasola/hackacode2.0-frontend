"use client";

import { usePathname, useRouter } from "next/navigation";
import { menuItems } from "../(auth)/routes";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import UserProfile from "./user-profile";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/slices/authSlice";

const AdminDashboardHeader = () => {
  const url = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogOut = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="h-[10vh] w-full px-10 flex justify-between items-center ">
      <div className="icon-path text-xl font-bold flex gap-4">
        <span>
          {menuItems
            .find((item) => item.path === url)
            ?.icon({
              color: "#2B318A",
            })}
        </span>
        <p className="text-secondary font-[500]">
          {menuItems.find((item) => item.path === url)?.text}
        </p>
      </div>
      <div className="flex gap-4 items-center ">
        <BellOutlined style={{ fontSize: "24px", color: "#6A6E83" }} />
        <UserProfile
          name={user?.email}
          lastname={''}
          position={''}
          size={"large"} />
        <DownOutlined style={{ fontSize: "16px", color: "#1F1F1F", cursor:'pointer' }} onClick={handleLogOut} />
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
