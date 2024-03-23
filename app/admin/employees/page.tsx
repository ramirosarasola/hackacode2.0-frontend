"use client";
import DataTable from "@/app/ui/tables/data-table";
import { useCustomModal } from "@/hooks/useModal";
import { RegisterEmployee } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { registerUser } from "@/lib/slices/authSlice";
import { createEmployee, fetchEmployees } from "@/lib/slices/employeeSlice";
import { Modal } from "antd";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getTableColumns, useEditFunctions } from "./data-columns";
import EmployeeForm from "./employee-form";
import RegisterForm from "@/app/(auth)/sign-up/register-form";
import AddForm from "@/app/ui/add-form";

export default function Employees() {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employee);
  const { open, showModal, handleCancel } = useCustomModal();

  const { register, handleSubmit, reset } = useForm<RegisterEmployee>();
  const editFunctions = useEditFunctions(employees, dispatch);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const dynamicFormFields = [
    { name: "email", label: "email", type: "text", required: true },
    { name: "password", label: "password", type: "text", required: true },
    { name: "name", label: "name", type: "text", required: true },
    { name: "lastname", label: "lastname", type: "text", required: true },
    { name: "address", label: "address", type: "text", required: true },
    { name: "dni", label: "dni", type: "text", required: true },
    { name: "birthdate", label: "birthdate", type: "date", required: true },
    { name: "country", label: "country", type: "text", required: true },
    { name: "phone", label: "phone", type: "text", required: true },
    { name: "position", label: "position", type: "text", required: true },
    { name: "salary", label: "salary", type: "text", required: true },
  ];

  // Manejador para enviar el formulario
  const onSubmit: SubmitHandler<RegisterEmployee> = (
    formData: RegisterEmployee
  ) => {
    console.log(formData);
    dispatch(registerUser({ newUser: formData }));
    reset();
  };

  return (
    <>
      <DataTable
        data={employees}
        columns={getTableColumns(editFunctions) || []}
        add="Add Employee"
        addFunction={showModal}
      />
      <Modal
        onCancel={handleCancel}
        open={open}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{  hidden: true }}
      >
        <AddForm
          dynamicFormFields={dynamicFormFields}
          createEntity={registerUser}
          setShowModal={handleCancel}
        />
      </Modal>
    </>
  );
}
