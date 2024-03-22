import CustomerIconComponent from "../ui/icons/customer-icon";
import EmployeeIconComponent from "../ui/icons/employee-icon";
import HomeIconComponent from "../ui/icons/home-icon";
import ServiceIconComponent from "../ui/icons/service-icon";
import SaleIconComponent from "../ui/icons/sale-icon";

export const menuItems = [
  { path: "/admin", text: "Home", icon: HomeIconComponent },
  { path: "/admin/employees", text: "Employees", icon: EmployeeIconComponent },
  { path: "/admin/customers", text: "Customers", icon: CustomerIconComponent },
  { path: "/admin/services", text: "Services", icon: ServiceIconComponent },
  { path: "/admin/sales", text: "Sales", icon: SaleIconComponent },
];
