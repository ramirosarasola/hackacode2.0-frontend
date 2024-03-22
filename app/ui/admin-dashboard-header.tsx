"use client";

import { usePathname, useRouter } from "next/navigation";
import { menuItems } from "../(auth)/routes";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import UserProfile from "./user-profile";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/slices/authSlice";
import { useEffect, useState } from "react";
import { fetchEmployeeById } from "@/lib/slices/employeeSlice";

const AdminDashboardHeader = () => {
  const url = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const { userEmployee } = useAppSelector((state) => state.employee);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const userId = user?.id;
  useEffect(() => {
    if (userId) {
      dispatch(fetchEmployeeById(userId)).then((result) => {
        if (result.payload.employee) {
          setShow(true);
        }
      });
    }
  }, [userId, dispatch]);

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
        {show && (
          <>
            <UserProfile
              name={userEmployee.name}
              lastname={userEmployee.lastname}
              position={userEmployee.position}
              size={"small"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
