"use client";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/slices/authSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthFormTitle from "./auth-form-title";
import { menuItems } from "../(auth)/routes";
import { useRouter } from "next/navigation";
import LogoutIconComponent from "./icons/logout-icon";

export default function Sidebar() {
  const url = usePathname();
  const isActive = (pathname: string) => pathname === url;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/')
  }

  return (
    <div className="admin-sidebar min-h-[100vh] min-w-[250px] max-w-[350px] w-[20vw] pt-[3vh] bg-white flex flex-col items-center justify-start gap-10 box-border">
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
                  className={`${
                    isActive(item.path) ? "text-tertiary" : "lightGray"
                  }`}
                >
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
          <li onClick={handleLogout} className="pl-6 flex gap-2 items-center relative justify-center text-[1.1rem]">
            <Link className="w-full flex items-center gap-2" href="">
              <div className="w-1 h-full bg-white"></div>
              <LogoutIconComponent color="#6A6E83" />
              <span className="lightGray">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
