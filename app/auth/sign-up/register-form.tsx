"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/app/validations/registerSchema";
import InputField from "@/app/ui/label-input";
import { useState } from "react";
import { User } from "@/interface/types";
import { useAppDispatch } from "@/lib/hooks";
import { registerUser } from "@/lib/features/authSlice";

type InputsRegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  lastname: string;
  dni: string;
  phone: string;
  address: string;
  country: string;
  position: string;
  birthdate: string;
  salary: number;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputsRegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  console.log(errors);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<InputsRegisterForm> = (data) => {
    console.log(data);
    dispatch(registerUser(formData))
    if (data) reset();
  };

  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    lastname: "",
    dni: "",
    phone: "",
    address: "",
    country: "",
    position: "",
    birthdate: "",
    salary: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="p-4 bg-gray-800 text-white flex flex-col items-center justify-center rounded-md shadow-md">
      <form
        id="auth-form"
        className="min-w-[400px] max-w-[800px] flex items-center gap-4 p-6 rounded-md shadow-md"
      >
        <div className="flex flex-col md:col-span-1 h-full gap-2">
          <InputField
            type="string"
            id="name"
            label="Name"
            zodMethod={register}
            errors={errors}
            autoComplete={"John"}
            onChange={handleChange}
          />
          <InputField
            type="string"
            id="lastname"
            label="Lastname"
            zodMethod={register}
            errors={errors}
            autoComplete={"Doe"}
            onChange={handleChange}
          />

          <InputField
            type="email"
            id="email"
            label="Email"
            zodMethod={register}
            errors={errors}
            autoComplete={"johndoe@gmail.com"}
            onChange={handleChange}
          />
          <InputField
            type="password"
            id="password"
            label="password"
            zodMethod={register}
            errors={errors}
            autoComplete="new-password"
            onChange={handleChange}
          />

          <InputField
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            zodMethod={register}
            errors={errors}
            autoComplete="confirmPassword"
            onChange={handleChange}
          />

          <label htmlFor="position" className="flex">
            Position
          </label>
          <select className="" id="position" {...register("position")}>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="guest">Guest</option>
          </select>

          <span>
            {errors.position?.message && (
              <p>{String(errors.position?.message)}</p>
            )}
          </span>
        </div>

        <div className="flex flex-col md:col-span-1 gap-2">
          <InputField
            type="text"
            id="country"
            label="Country"
            zodMethod={register}
            errors={errors}
            autoComplete={"usa"}
            onChange={handleChange}
          />

          <InputField
            type="text"
            id="address"
            label="Address"
            zodMethod={register}
            errors={errors}
            autoComplete={"Av. Street 47"}
            onChange={handleChange}
          />

          <InputField
            type="text"
            id="dni"
            label="DNI"
            zodMethod={register}
            errors={errors}
            autoComplete={"12312312"}
            onChange={handleChange}
          />

          <InputField
            type="text"
            id="phone"
            label="Phone"
            zodMethod={register}
            errors={errors}
            autoComplete={"+54 11 0000 2222"}
            onChange={handleChange}
          />

          <InputField
            type="number"
            id="salary"
            label="salary"
            zodMethod={register}
            errors={errors}
            autoComplete={"25000"}
            onChange={handleChange}
          />

          <InputField
            type="date"
            id="dateOfBirth"
            label="Date Of Birth"
            zodMethod={register}
            errors={errors}
            autoComplete={"18/01/1900"}
            onChange={handleChange}
          />
        </div>
      </form>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleSubmit(onSubmit)}
      >
        Register
      </button>
    </div>
  );
}
