import { AuthInput } from "@/app/ui/auth-input";
import { RegisterEmployee, Sale } from "@/interface/types";
import { UseFormRegister } from "react-hook-form";

// Define la interface para los props de ServiceForm
interface SaleFormProps {
  register: UseFormRegister<Sale>;
}

const SaleForm: React.FC<SaleFormProps> = ({ register }) => {
  return (
    <form action="" className="flex flex-col gap-4 mt-8">
      {/* employee_id */}
      <AuthInput
        label="employee_id"
        placeholder="Employee ID"
        register={register}
        required={true}
        type={"number"}
        autoComplete={"Employee"}
      />
      {/* customer_id */}
      <AuthInput
        label="customer_id"
        placeholder="Customer ID"
        register={register}
        required={true}
        type={"number"}
        autoComplete={"Customer"}
      />
      {/* createdAt */}
      <AuthInput
        label="createdAt"
        placeholder="Date"
        register={register}
        required={true}
        type={"date"}
        autoComplete={"Date"}
      />
    </form>
  );
};

export default SaleForm;
