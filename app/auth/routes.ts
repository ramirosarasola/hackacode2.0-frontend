import CustomerIcon from "../ui/icons/customer-icon";
import EmployeeIcon from "../ui/icons/employee-icon";
import HomeIcon from "../ui/icons/home-icon";
import ProfileIcon from "../ui/icons/profile-icon";
import ServiceIcon from "../ui/icons/service-icon";

export const menuItems = [
  { path: "/admin", text: "Home", icon: HomeIcon },
  { path: "/admin/employees", text: "Employees", icon: EmployeeIcon },
  { path: "/admin/customers", text: "Customers", icon: CustomerIcon },
  { path: "/admin/servicies", text: "Servicies", icon: ServiceIcon },
  { path: "/admin/profile", text: "Profile", icon: ProfileIcon },
];