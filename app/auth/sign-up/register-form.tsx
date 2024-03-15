"use client";
import AuthFormTitle from "@/app/ui/auth-form-title";
import { AuthInput } from "@/app/ui/auth-input";
import { registerUser } from "@/lib/slices/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { ConfigProvider, Steps } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IFormValues {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirm_password: string;
  dni: string;
  address: string;
  country: string;
  birthdate: Date;
  phone: string;
  position: string;
  salary: number;
}

const RegisterForm = () => {
  const { register, handleSubmit, reset } = useForm<IFormValues>();
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const onChangeStep = (value: number) => {
    console.log("onChange:", value);
    setCurrentStep(value);
  };

  const onSubmit: SubmitHandler<IFormValues> = (formData) => {
    console.log(formData);

    dispatch(registerUser({ newUser: formData })).then((result) => {
      router.push('/admin')

      if (result.payload) {
        
      }
      reset();
    });
  };

  const handleNextStep = () => {
    if (currentStep === 2) {
      handleSubmit(onSubmit)();
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  return (
    <section className="register gap-8 flex flex-col items-center justify-between w-full md:w-2/4">
      <AuthFormTitle size="lg" />

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "5A81FA",
          },
        }}
      >
        <Steps
          current={currentStep}
          onChange={onChangeStep}
          items={[{}, {}, {}]}
        />
      </ConfigProvider>

      <form className="flex flex-col items-center justify-center gap-8 w-full">
        {currentStep === 0 ? (
          <>
            <div className="flex gap-4 w-full">
              <AuthInput
                label="name"
                register={register}
                required
                type={""}
                autoComplete={"name"}
              />
              <AuthInput
                label="lastname"
                register={register}
                required
                type={""}
                autoComplete={"lastname"}
              />
            </div>
            <AuthInput
              label="email"
              register={register}
              required
              type={""}
              autoComplete={"email"}
            />
            <input hidden name="username" autoComplete="username" />
            <AuthInput
              label="password"
              register={register}
              required
              type={"password"}
              autoComplete={"new-password"}
            />
            <AuthInput
              label="confirm password"
              register={register}
              required
              type={"password"}
              autoComplete={"new-password"}
            />
          </>
        ) : currentStep === 1 ? (
          <>
            <AuthInput
              label="dni"
              register={register}
              required
              type={""}
              autoComplete={"dni"}
            />
            <AuthInput
              label="address"
              register={register}
              required
              type={""}
              autoComplete={"address"}
            />
            <AuthInput
              label="country"
              register={register}
              required
              type={""}
              autoComplete={"country"}
            />
            <AuthInput
              label="birthdate"
              register={register}
              required
              type={"date"}
              autoComplete={"birthdate"}
            />
          </>
        ) : (
          <>
            <AuthInput
              label="phone"
              register={register}
              required
              type={""}
              autoComplete={"phone"}
            />
            <AuthInput
              label="salary"
              register={register}
              required
              type={"number"}
              autoComplete={"salary"}
            />

            <AuthInput
              label="position"
              register={register}
              required
              type={""}
              autoComplete={"position"}
            />
          </>
        )}
      </form>

      <div className="wrapper flex flex-col items-center justify-center gap-8 w-full">
        <button
          onClick={handleNextStep}
          className={`text-[3vw] md:text-[14px] text-white py-2 px-4 rounded-full w-full md:w-9/12 h-[15vw] md:h-[51px] ${
            currentStep == 2 ? "bg-[#2C3D8F]" : "bg-tertiary"
          }`}
        >
          {currentStep == 2 ? "Create Account" : "Next"}
        </button>
        <p className="text-[#A8B1CF]">
          Already have an account?{" "}
          <Link href="/" className="text-blue-500 underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </section>


    
  );
};
export default RegisterForm;
