"use client";

import { usePathname } from "next/navigation";
import { menuItems } from "../auth/routes";
// import { useAppSelector } from "@/lib/hooks";
import { BellOutlined, DownOutlined } from "@ant-design/icons";

const AdminDashboardHeader = () => {
  const url = usePathname();
  // const { user } = useAppSelector((state) => state.auth);
  // test user

  const user = {
    name: "John",
    lastname: "Doe",
    position:'Developer'
  };

  return (
    <div className="h-[10vh] w-full px-6 flex justify-between items-center ">
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
        <BellOutlined style={{ fontSize: '24px', color:'#6A6E83'}}/>
        <div className="text-lg flex flex-col items-center justify-center text-[#1F1F1F] text-[18px] font-[600] ">{`${user?.name} ${user?.lastname}`} <span className="text-[#A8B1CF] text-[16px] font-[400]">{user?.position}</span></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <DownOutlined style={{ fontSize: '16px', color:'#1F1F1F'}} />
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
