"use client";

import { useCustomModal } from "@/hooks/useModal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { getTableColumns, useEditFunctions } from "./data-column";
import { useEffect } from "react";
import { createSale, fetchSales } from "@/lib/slices/saleSlice";
import DataTable from "@/app/ui/tables/data-table";
import { Modal } from "antd";
import SaleForm, { ICreateSale } from "./sale-form";

export default function Sales() {
  const dispatch = useAppDispatch();
  const { sales } = useAppSelector((state) => state.sale);
  const { open, showModal, handleCancel } = useCustomModal();

  const editFunctions = useEditFunctions(sales, dispatch);
  
  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);
  
  const { register, handleSubmit, reset } = useForm<ICreateSale>();

  // Manejador para enviar el formulario
  const onSubmit: SubmitHandler<ICreateSale> = (formData: ICreateSale) => {
    console.log(formData.services);
    const processedData:any = {
      ...formData,
      services: formData.services ? formData.services.map((value) => ({ id: value })) : [],
    }
    dispatch(createSale(processedData));
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
