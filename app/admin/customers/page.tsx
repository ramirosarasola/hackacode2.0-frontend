"use client";
import AddForm from "@/app/ui/add-form";
import DataTable from "@/app/ui/tables/data-table";
import { useCustomModal } from "@/hooks/useModal";
import { Customer } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createCustomer, fetchCustomers } from "@/lib/slices/customerSlice";
import { Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { getTableColumns, useEditFunctions } from "./data-columns";

export default function Customers() {
  const { open, showModal, handleCancel } = useCustomModal();

  const dispatch = useAppDispatch();
  const { customers, loading, error } = useAppSelector(
    (state) => state.customer
  );

  const editFunctions = useEditFunctions(customers, dispatch);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const columns: ColumnsType<Customer> | undefined =
    getTableColumns(editFunctions); // replace getColumns() with your actual function or variable

  if (columns !== undefined) {
    // Now you can assign columns to a variable or property of type ColumnsType<any>
    const anyColumns: ColumnsType<any> = columns;
  }

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
        minLength: {
          value: 5,
          message: "DNI must be at least 5 characters long",
        },
        pattern: {
          value: /^\d+$/,
          message: "DNI must contain only numbers",
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
  ];

  return (
    <>
      <DataTable
        data={customers}
        columns={columns || []}
        add={"Add Customer"}
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
          createEntity={createCustomer}
          setShowModal={handleCancel}
        />
      </Modal>
    </>
  );
}
