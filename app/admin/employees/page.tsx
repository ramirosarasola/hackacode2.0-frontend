"use client";
import DataTable from "@/app/ui/tables/data-table";
import { useCustomModal } from "@/hooks/useModal";
import { RegisterEmployee } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createEmployee, fetchEmployees } from "@/lib/slices/employeeSlice";
import { Modal } from "antd";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getTableColumns, useEditFunctions } from "./data-columns";
import EmployeeForm from "./employee-form";
import { registerUser } from "@/lib/slices/authSlice";

export default function Employees() {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employee);
  const { open, showModal, handleCancel } = useCustomModal();

  const { register, handleSubmit, reset } = useForm<RegisterEmployee>();
  const editFunctions = useEditFunctions(employees, dispatch);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);


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
        title="New Employee"
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        open={open}
        okButtonProps={{ disabled: false, type: "default" }}
        cancelButtonProps={{ disabled: false, type: "default" }}
      >
        <EmployeeForm register={register} />
      </Modal>
    </>
  );
}
