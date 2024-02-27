"use client";

import { loginUser } from "@/lib/features/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Path, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";

interface IFormValues {
  email: string;
  password: string;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
};
const Input = ({ label, register, required }: InputProps) => (
  <>
    <label>{label}</label>
    <input {...register(label, { required })} />
  </>
);

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = ({email, password}) => {
    console.log({email, password});
    dispatch(loginUser({ email, password }))
      .then((result) => {
        console.log(result);
        
        if (result.payload) {
        console.log(result.payload);
      }
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="email" register={register} required />
      <Input label="password" register={register} required />
      <input type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700" />
    </form>
  );
};

export default LoginForm;