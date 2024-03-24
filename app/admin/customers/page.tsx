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
    { name: "email", label: "email", type: "text", required: true },
    { name: "name", label: "name", type: "text", required: true },
    { name: "lastname", label: "lastname", type: "text", required: true },
    { name: "address", label: "address", type: "text", required: true },
    { name: "dni", label: "dni", type: "text", required: true },
    {
      name: "birthdate",
      label: "birthdate",
      type: "date",
      required: true,
    },
    { name: "country", label: "country", type: "text", required: true },
    { name: "phone", label: "phone", type: "text", required: true },
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
