"use client";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  type: string;
  autoComplete: string;
  placeholder: string;
};

export const AuthInput = <T extends FieldValues>({
  placeholder,
  label,
  register,
  required,
  type,
  autoComplete,
}: InputProps<T>) => (
  <input
    autoComplete={autoComplete}
    type={type}
    placeholder={placeholder}
    className="auth-input"
    {...register(label, { required })}
  />
);
