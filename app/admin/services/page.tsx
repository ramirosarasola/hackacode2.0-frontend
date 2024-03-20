'use client';
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal } from "antd";
import DataTable from "@/app/ui/tables/data-table";
import { Service } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createService, fetchServices, updateService } from "@/lib/slices/serviceSlice";
import { getTableColumns, useEditFunctions } from "./data-columns";
import { useCustomModal } from "@/hooks/useModal";
import ServiceForm from "./service-form";

export default function Services() {
  // Estado y funciones del modal
  const { open, showModal, handleCancel } = useCustomModal();

  // Dispatch y selección del estado
  const dispatch = useAppDispatch();
  const { services, loading, error } = useAppSelector((state) => state.service);

  // Efecto para cargar los servicios
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Formulario y funciones de edición
  const { register, handleSubmit, reset } = useForm<Service>();
  const editFunctions = useEditFunctions(services, dispatch); 

  // Manejador para enviar el formulario
  const onSubmit: SubmitHandler<Service> = (formData: Service) => {
    console.log(formData);
    dispatch(createService(formData));
    reset();
  };

  return (
    <>
      <DataTable
        data={services}
        columns={getTableColumns(editFunctions)}
        add={"Add Service"}
        addFunction={showModal}
      />
      <Modal
        title="New Service"
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        open={open}
        okButtonProps={{ disabled: false, type: "default" }}
        cancelButtonProps={{ disabled: false, type: "default" }}
      >
        <ServiceForm register={register} />
      </Modal>
    </>
  );
}