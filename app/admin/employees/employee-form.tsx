import { AuthInput } from "@/app/ui/auth-input";
import { RegisterEmployee } from "@/interface/types";
import { UseFormRegister } from "react-hook-form";

// Define la interface para los props de ServiceForm
interface RegisterEmployeeFormProps {
  register: UseFormRegister<RegisterEmployee>;
}

const RegisterEmployeeForm: React.FC<RegisterEmployeeFormProps> = ({ register }) => {
  return (
    <form action="" className="flex flex-col gap-4 mt-8">
      <AuthInput
        label="name"
        required
        type="text"
        autoComplete="name"
        placeholder="Enter name"
        register={register}
      />
      <AuthInput
        type="text"
        autoComplete="Lastname"
        label="lastname"
        placeholder="Enter lastname"
        register={register}
        required
      />
      <AuthInput
        label="phone"
        required
        type="tel"
        autoComplete="phone"
        placeholder="Enter phone"
        register={register}
      />
      <AuthInput
        autoComplete="position"
        label="position"
        register={register}
        type="text"
        required
        placeholder="Enter position"
      />
      <AuthInput
        autoComplete="#000"
        type="number"
        label="salary"
        register={register}
        required
        placeholder="Salary"
      />
      {/* authInput for birthdate */}
      <AuthInput
        autoComplete="#000"
        type="date"
        label="birthdate"
        register={register}
        required
        placeholder="Birthdate"
      />
      {/* nacionality */}
      <AuthInput
        autoComplete="#000"
        type="text"
        label="country"
        register={register}
        required
        placeholder="Country"
      />
      {/* address */}
      <AuthInput
        autoComplete="#000"
        type="text"
        label="address"
        register={register}
        required
        placeholder="Address"
      />
      {/* dni */}
      <AuthInput
        autoComplete="#000"
        type="text"
        label="dni"
        register={register}
        required
        placeholder="DNI"
      />
      {/* email */}
      <AuthInput
        autoComplete="#000"
        type="email"
        label="email"
        register={register}
        required
        placeholder="Email"
      />
      {/* password */}
      <AuthInput
        autoComplete="#000"
        type="password"
        label="password"
        register={register}
        required
        placeholder="Password"
      />
    </form>
  );
};

export default RegisterEmployeeForm;
