"use client";

import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  type: string;
  autoComplete: string;
  id: string;
};

export const AuthInput = <T extends FieldValues>({
  label,
  register,
  required,
  type,
  autoComplete,
}: InputProps<T>) => (
  <input
    id={label}
    autoComplete={autoComplete}
    type={type}
    placeholder={label}
    className="auth-input"
    {...register(label, { required })}
  />
);
