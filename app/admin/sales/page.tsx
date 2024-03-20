"use client";
import DataTable from "@/app/ui/tables/data-table";
import { useCustomModal } from "@/hooks/useModal";
import { Sale } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createSale } from "@/lib/slices/saleSlice";
import { fetchSales } from "@/lib/slices/saleSlice";
import { Modal } from "antd";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getTableColumns, useEditFunctions } from "./data-column";
import SaleForm from "./sale-form";

export default function Sales() {
  const dispatch = useAppDispatch();
  const { sales } = useAppSelector((state) => state.sale);
  const { open, showModal, handleCancel } = useCustomModal();

  const { register, handleSubmit, reset } = useForm<Sale>();
  const editFunctions = useEditFunctions(sales, dispatch);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  // Manejador para enviar el formulario
  const onSubmit: SubmitHandler<Sale> = (
    formData: Sale
  ) => {
    console.log(formData);
    dispatch(createSale(formData));
    reset();
  };

  return (
    <>
      <DataTable
        data={sales}
        columns={getTableColumns(editFunctions) || []}
        add="Add Sale"
        addFunction={showModal}
      />
      <Modal
        title="New Sale"
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        open={open}
        okButtonProps={{ disabled: false, type: "default" }}
        cancelButtonProps={{ disabled: false, type: "default" }}
      >
        <SaleForm register={register} />
      </Modal>
    </>
  );
}
