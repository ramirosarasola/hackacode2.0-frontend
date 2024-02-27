"use client";
import { loginUser } from "@/lib/features/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { Path, SubmitHandler, UseFormRegister, useForm } from "react-hook-form";

interface IFormValues {
  email: string;
  password: string;
}

type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  type: string;
  autoComplete: string;
};
const Input = ({ label, register, required, type, autoComplete }: InputProps) => {
  return (
    <input
      autoComplete={autoComplete}
      type={type}
      placeholder={label}
      className="auth-input"
      {...register(label, { required })}
    />
  );
};

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = ({ email, password }) => {
    console.log({ email, password });
    dispatch(loginUser({ email, password })).then((result) => {
      console.log(result);

      if (result.payload) {
        console.log(result.payload);
        router.push('/')
      }
    });
    reset();
  };

  return (
    <section className="login flex flex-col items-center justify-between w-2/4 h-3/5">
      <div className="title flex items-center">
        <h1 className="text-black text-[50px]">
          <span className="text-tertiary font-semibold">Go</span>Travel
        </h1>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.3688 27.0585L15.6871 25.4979C10.7845 23.8638 8.33325 23.0467 8.33325 21.5451C8.33325 20.0435 10.7845 19.2264 15.687 17.5922L15.687 17.5922L33.4228 11.6803C36.8724 10.5305 38.5972 9.95554 39.5076 10.866C40.4181 11.7764 39.8431 13.5012 38.6933 16.9508L38.6933 16.9508L32.7814 34.6865C31.1472 39.5891 30.3301 42.0403 28.8285 42.0403C27.3269 42.0403 26.5098 39.5891 24.8757 34.6865L23.3151 30.0048L32.385 20.9349C33.1986 20.1213 33.1986 18.8022 32.385 17.9886C31.5714 17.175 30.2523 17.175 29.4387 17.9886L20.3688 27.0585Z"
            fill="#5A81FA"
          />
        </svg>
      </div>

      {/* <ConfigProvider
        theme={{
          token: {
            colorPrimary: "5A81FA",
          },
        }}
      >
        <Stepper />
      </ConfigProvider> */}

      <form
        className="flex flex-col items-center justify-center gap-8 w-full"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <Input autoComplete="email" type={"email"} label="email" register={register} required />
        <Input
          autoComplete="current-password"
          type={"password"}
          label="password"
          register={register}
          required
        />
      </form>
      <div className="wrapper flex flex-col items-center justify-center gap-8 w-full">
        <button
          onClick={handleSubmit(onSubmit)}
          className="text-[14px] bg-tertiary text-white py-2 px-4 rounded-full w-9/12 h-[51px]"
        >
          Sign In
        </button>
        <button
          // onClick={handleSubmit}
          className="text-[14px] bg-cuartary text-tertiary py-2 px-4 rounded-full w-9/12 h-[51px]"
        >
          Log In
        </button>
      </div>
    </section>
  );
};

export default LoginForm;
