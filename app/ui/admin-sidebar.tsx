"use client";
import CustomerIcon from "@/app/ui/icons/customer-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthFormTitle from "./auth-form-title";
import EmployeeIcon from "./icons/employee-icon";
import HomeIcon from "./icons/home-icon";
import ProfileIcon from "./icons/profile-icon";
import ServiceIcon from "./icons/service-icon";

export default function Sidebar() {
  const url = usePathname();
  const isActive = (pathname: string) => pathname === url;

  const menuItems = [
    { path: "/", text: "Home", icon: HomeIcon },
    { path: "/employees", text: "Employees", icon: EmployeeIcon },
    { path: "/customers", text: "Customers", icon: CustomerIcon },
    { path: "/servicies", text: "Servicies", icon: ServiceIcon },
    { path: "/profile", text: "Profile", icon: ProfileIcon },
  ];

  return (
    <div className="admin-sidebar fixed ml-4 min-h-[98vh] max-w-[350px] min-w-[250px] mt-[2vh] w-[20vw] pt-4 bg-white rounded-t-3xl flex flex-col items-center justify-start gap-10 box-border">
      <AuthFormTitle size={"sm"} />
      <div className="nav h-full w-full text-black">
        <ul className="flex flex-col gap-8 w-full">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`pl-6 flex gap-2 items-center relative justify-center text-[1.1rem]`}
            >
              <div
                className={`absolute left-0 h-full w-1 ${
                  isActive(item.path) ? "bg-tertiary" : "bg-transparent"
                }`}
              />
              <Link className="w-full flex items-center gap-2" href={item.path}>
                <div
                  className={`w-1 h-full ${
                    isActive(item.path) ? "bg-tertiary" : "bg-white"
                  }`}
                ></div>
                {item.icon({
                  color: isActive(item.path) ? "#5A81FA" : "#6A6E83",
                })}
                <span
                  className={`${isActive(item.path) ? "text-tertiary" : "lightGray"}`}
                >
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
