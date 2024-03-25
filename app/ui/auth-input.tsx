import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  type: string;
  autoComplete: string;
  placeholder: string;
  validation?: any;
  errors: any;
};

export const AuthInput = <T extends FieldValues>({
  placeholder,
  label,
  register,
  required,
  type,
  autoComplete,
  validation,
  errors,
}: InputProps<T>) => (
  <label className="w-full">
    <input
      autoComplete={autoComplete}
      type={type}
      placeholder={placeholder}
      className="auth-input"
      {...register(label, { required, ...validation })}
    />
    {
      errors &&
      errors[label] && (
        <span className="error-message">{errors[label]?.message}</span>
    )}
  </label>
);
