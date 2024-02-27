"use client";
import { registerUser } from "@/lib/features/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Path, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";

interface IFormValues {
  name: string;
  email: string;
  password: string;
  lastname: string;
  dni: string;
  phone: string;
  address: string;
  country: string;
  position: string;
  salary: number;
  birthdate: Date;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
};

const Input = ({ label, register, required }: InputProps) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      {...register(label, { required })}
    />
  </div>
);

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = (formData) => {
    console.log(formData);

    dispatch(registerUser({ newUser: formData })).then((result) => {
      console.log(result);

      if (result.payload) {
        console.log(result.payload);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="name" register={register} required />
      <Input label="email" register={register} required />
      <Input label="password" register={register} required />
      <Input label="lastname" register={register} required />
      <Input label="country" register={register} required />
      <Input label="phone" register={register} required />
      <Input label="salary" register={register} required />
      <Input label="address" register={register} required />
      <Input label="dni" register={register} required />
      <Input label="position" register={register} required />
      <input
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700"
      />
    </form>
  );
};

export default RegisterForm;
