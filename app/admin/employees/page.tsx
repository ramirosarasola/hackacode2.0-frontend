"use client";
import AddForm from "@/app/ui/add-form";
import DataTable from "@/app/ui/tables/data-table";
import { useCustomModal } from "@/hooks/useModal";
import { RegisterEmployee } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { registerUser } from "@/lib/slices/authSlice";
import { fetchEmployees } from "@/lib/slices/employeeSlice";
import { Modal } from "antd";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getTableColumns, useEditFunctions } from "./data-columns";

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
    {
      name: "email",
      label: "email",
      type: "text",
      required: true,
      validation: {
        required: "Email is required",
        pattern: {
          value: /^\S+@\S+$/i,
          message: "Invalid email address",
        },
      },
    },
    {
      name: "password",
      label: "password",
      type: "password",
      required: true,
      validation: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
      },
    },
    {
      name: "name",
      label: "name",
      type: "text",
      required: true,
      validation: {
        required: "Name is required",
        minLength: {
          value: 2,
          message: "Name must be at least 2 characters",
        },
      },
    },
    {
      name: "lastname",
      label: "lastname",
      type: "text",
      required: true,
      validation: {
        required: "Lastname is required",
        minLength: {
          value: 2,
          message: "Lastname must be at least 2 characters",
        },
      },
    },
    {
      name: "address",
      label: "address",
      type: "text",
      required: true,
      validation: {
        required: "Address is required",
        minLength: {
          value: 5,
          message: "Address must be at least 5 characters",
        },
      },
    },
    {
      name: "dni",
      label: "dni",
      type: "text",
      required: true,
      validation: {
        required: "DNI is required",
        pattern: {
          value: /^\d{8}[A-Za-z]$/,
          message: "Invalid DNI format",
        },
      },
    },
    {
      name: "birthdate",
      label: "birthdate",
      type: "date",
      required: true,
      validation: {
        required: "Birthdate is required",
      },
    },
    {
      name: "country",
      label: "country",
      type: "text",
      required: true,
      validation: {
        required: "Country is required",
        minLength: {
          value: 2,
          message: "Country name must be at least 2 characters",
        },
      },
    },
    {
      name: "phone",
      label: "phone",
      type: "text",
      required: true,
      validation: {
        required: "Phone number is required",
        pattern: {
          value: /^\+?\d{1,4}?[-. ]?\(?\d{1,3}?\)?[-. ]?\d{1,4}[-. ]?\d{1,9}$/,
          message: "Invalid phone number format",
        },
      },
    },
    {
      name: "position",
      label: "position",
      type: "text",
      required: true,
      validation: {
        required: "Position is required",
        minLength: {
          value: 2,
          message: "Position must be at least 2 characters",
        },
      },
    },
    {
      name: "salary",
      label: "salary",
      type: "number",
      required: true,
      validation: {
        required: "Salary is required",
        min: {
          value: 0,
          message: "Salary must be at least 0",
        },
      },
    },
  ];

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
        cancelButtonProps={{ hidden: true }}
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
