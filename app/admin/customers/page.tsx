"use client";
import DataTable from "@/app/ui/tables/data-table";
import { useCustomModal } from "@/hooks/useModal";
import { Customer } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createCustomer, fetchCustomers } from "@/lib/slices/customerSlice";
import { Modal } from "antd";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomerForm from "./customer-form";
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

  const { register, handleSubmit, reset } = useForm<Customer>();

  // Manejador para enviar el formulario
  const onSubmit: SubmitHandler<Customer> = (formData: Customer) => {
    console.log(formData);
    dispatch(createCustomer(formData));
    reset();
  };

  return (
    <>
      <DataTable
        data={customers}
        columns={getTableColumns(editFunctions)}
        add={"Add Customer"}
        addFunction={showModal}
      />
      <Modal
        title="New Customer"
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        open={open}
        okButtonProps={{ disabled: false, type: "default" }}
        cancelButtonProps={{ disabled: false, type: "default" }}
      >
        <CustomerForm register={register} />
      </Modal>
    </>
  );
}
