import { AuthInput } from "@/app/ui/auth-input";
import { Service } from "@/interface/types";
import { UseFormRegister } from "react-hook-form";

// Define la interface para los props de ServiceForm
interface ServiceFormProps {
  register: UseFormRegister<Service>;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ register }) => {
  return (
    <form action="" className="flex flex-col gap-4 mt-8">
      <AuthInput
        autoComplete="#000"
        type="text"
        label="service_code"
        register={register}
        required
        placeholder="Service Code"
      />
      <AuthInput
        autoComplete="#000"
        type="text"
        label="name"
        register={register}
        required
        placeholder="Name"
      />
      <AuthInput
        autoComplete="#000"
        type="text"
        label="description"
        register={register}
        required
        placeholder="Description"
      />
      <AuthInput
        autoComplete="#000"
        type="date"
        label="service_date"
        register={register}
        required
        placeholder="Service Date"
      />
      <AuthInput
        autoComplete="#000"
        type="number"
        label="price"
        register={register}
        required
        placeholder="Price"
      />
    </form>
  );
};

export default ServiceForm;
