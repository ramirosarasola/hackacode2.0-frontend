"use client";

import { usePathname } from "next/navigation";
import { menuItems } from "../(auth)/routes";
import { useAppSelector } from "@/lib/hooks";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import UserProfile from "./user-profile";
import { fetchEmployeeById } from "@/lib/slices/employeeSlice";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { loadUser } from "@/lib/slices/authSlice";

const AdminDashboardHeader = () => {
  const url = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { employee } = useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(loadUser()).then((result) => {
      if(result.payload){
        dispatch(fetchEmployeeById(user.data.id));
      }
    })
  }, [dispatch]);

  console.log(user)
  console.log(employee)
 
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
          name={employee[0].name}
          lastname={employee[0].lastname}
          position={employee[0].position}
          size={"large"} />
        <DownOutlined style={{ fontSize: "16px", color: "#1F1F1F" }} />
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
