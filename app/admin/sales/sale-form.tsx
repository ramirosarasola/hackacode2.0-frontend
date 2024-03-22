"use client";
import { Service } from "@/interface/types";
import { useAppSelector } from "@/lib/hooks";
import { UseFormRegister } from "react-hook-form";

// Define la interface para los props de ServiceForm
interface SaleFormProps {
  register: UseFormRegister<ICreateSale>;
}

export interface ICreateSale {
  employee_id: number; // Ajusta el tipo según tu necesidad
  customer_id: number;
  payment_method: string;
  services: Service[];
}

const PAYMENT_METHODS = [
  { method: "Credit Card", value: "credit" },
  { method: "Debit Card", value: "debit" },
  { method: "E Wallet", value: "ewallet" },
  { method: "Bank Transfer", value: "transfer" },
];

const SaleForm: React.FC<SaleFormProps> = ({ register }) => {
  const { employees } = useAppSelector((state) => state.employee);
  const { customers } = useAppSelector((state) => state.customer);
  const { services } = useAppSelector((state) => state.service);

  const user = useAppSelector((state) => state.auth.user);
  const employee = employees.find((employee) => employee.user_id === user.id);
  const employee_id = employee ? Number.parseInt(employee?.id) : 0;

  return (
    <form action="" className="flex flex-col gap-4 mt-8">
      {/* employee_id */}
      <input
        type="hidden" // Oculta el campo employee_id
        {...register("employee_id", { value: employee_id })} // Asigna el valor predeterminado
      />
      {/* customer_id */}
      <select
        {...register("customer_id", { required: true })} // Agrega la validación requerida
        className="sale-select"
      >
        <option value="">Select a Customer</option>
        {customers.map((customer) => (
          <option className="" key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
      {/* payment_method */}
      <select
        {...register("payment_method", { required: true })} // Agrega la validación requerida
        className="sale-select"
      >
        <option value="">Payment Method</option>
        {PAYMENT_METHODS.map((method) => (
          <option key={method.value} value={method.value}>
            {method.method}
          </option>
        ))}
      </select>
      {/* services */}
      <select
        {...register("services", { required: true })}
        multiple
        className="sale-multiselect"
      >
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SaleForm;
