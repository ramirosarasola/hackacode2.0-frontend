"use client";
import AuthFormTitle from "@/app/ui/auth-form-title";
import { AuthInput } from "@/app/ui/auth-input";
import { useAppDispatch } from "@/lib/hooks";
import { ConfigProvider, Steps } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddForm = ({
  dynamicFormFields,
  createEntity,
  setShowModal,
}: {
  dynamicFormFields: any;
  createEntity: any;
  setShowModal: any;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: dynamicFormFields.reduce(
      (acc: any, field: any) => ({ ...acc, [field.name]: "" }),
      {}
    ),
  });
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const onChangeStep = (value: number) => {
    setCurrentStep(value);
  };

  const onSubmit: SubmitHandler<any> = (formData) => {
    console.log(formData);

    dispatch(createEntity(formData)).then((result: any) => {
      if (!result.payload) {
        alert("Error creating entity");
      }
      reset();
      setShowModal(false);
    });
  };

  const handleNextStep = (e: any) => {
    e.preventDefault();

    if (currentStep === 2) {
      // Verifica si hay errores en el formulario antes de intentar enviarlo
      if (Object.keys(errors).length === 0) {
        handleSubmit(onSubmit)();
      } else {
        console.log(errors);
      }
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  return (
    <section className="register gap-8 flex flex-col items-center justify-between w-full md:w-3/4 mx-auto">
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
        {currentStep == 0 &&
          dynamicFormFields
            .slice(0, 3)
            .map((field: any, index: any) => (
              <AuthInput
                key={index}
                register={register}
                placeholder={field.label}
                label={field.label}
                required={field.required}
                type={field.type}
                autoComplete={field.autoComplete || field.name}
                validation={field.validation}
                errors={errors}
              />
            ))}
        {currentStep == 1 &&
          dynamicFormFields
            .slice(3, 6)
            .map((field: any, index: any) => (
              <AuthInput
                key={index}
                register={register}
                placeholder={field.label}
                label={field.label}
                required={field.required}
                type={field.type}
                autoComplete={field.autoComplete || field.name}
                validation={field.validation}
                errors={errors}
              />
            ))}
        {currentStep == 2 &&
          dynamicFormFields
            .slice(6, dynamicFormFields.length)
            .map((field: any, index: any) => (
              <AuthInput
                key={index}
                register={register}
                placeholder={field.label}
                label={field.label}
                required={field.required}
                type={field.type}
                autoComplete={field.autoComplete || field.name}
                validation={field.validation}
                errors={errors}
              />
            ))}

        <div className="wrapper flex flex-col items-center justify-center gap-8 w-full"></div>
        <button
          onClick={(e) => handleNextStep(e)}
          className={`text-[3vw] md:text-[14px] text-white py-2 px-4 rounded-full w-full md:w-9/12 h-[15vw] md:h-[51px] ${
            currentStep == 2 ? "bg-[#2C3D8F]" : "bg-tertiary"
          }`}
        >
          {currentStep == 2 ? "Create Account" : "Next"}
        </button>
      </form>
    </section>
  );
};
export default AddForm;
