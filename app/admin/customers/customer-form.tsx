import { AuthInput } from "@/app/ui/auth-input";
import { Customer } from "@/interface/types";
import { UseFormRegister } from "react-hook-form";

// Define la interface para los props de ServiceForm
interface CustomerFormProps {
  register: UseFormRegister<Customer>;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ register }) => {
  return (
    <form action="" className="flex flex-col gap-4 mt-8">
      {/* email */}
      <AuthInput
        placeholder="Enter email"
        label="email"
        register={register}
        required
        type={""}
        autoComplete={"email"}
      />
      <AuthInput
        placeholder="Enter name"
        label="name"
        register={register}
        required
        type={""}
        autoComplete={"name"}
      />
      <AuthInput
        placeholder="Enter lastname"
        label="lastname"
        register={register}
        required
        type={""}
        autoComplete={"lastname"}
      />
      <AuthInput
        placeholder="Enter address"
        label="address"
        register={register}
        required
        type={""}
        autoComplete={"address"}
      />
      <AuthInput
        placeholder="Enter dni"
        label="dni"
        register={register}
        required
        type={""}
        autoComplete={"dni"}
      />
      <AuthInput
        placeholder="Enter birthdate"
        label="birthdate"
        register={register}
        required
        type={"date"}
        autoComplete={"birthdate"}
      />
      <AuthInput
        placeholder="Enter country"
        label="country"
        register={register}
        required
        type={""}
        autoComplete={"country"}
      />
      <AuthInput
        placeholder="Enter phone"
        label="phone"
        register={register}
        required
        type={""}
        autoComplete={"phone"}
      />
    </form>
  );
};

export default CustomerForm;
