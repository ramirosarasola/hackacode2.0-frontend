"use client";
import AddForm from "@/app/ui/add-form";
import DataTable from "@/app/ui/tables/data-table";
import { useCustomModal } from "@/hooks/useModal";
import { Service } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createService,
  fetchServices
} from "@/lib/slices/serviceSlice";
import { Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { getTableColumns, useEditFunctions } from "./data-columns";

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

  const editFunctions = useEditFunctions(services, dispatch);

  const columns: ColumnsType<Service> | undefined =
    getTableColumns(editFunctions); // replace getColumns() with your actual function or variable

  if (columns !== undefined) {
    // Now you can assign columns to a variable or property of type ColumnsType<any>
    const anyColumns: ColumnsType<any> = columns;
  }

  const dynamicFormFields = [
    {
      name: "service_code",
      label: "service_code",
      type: "text",
      required: true,
    },
    { name: "name", label: "name", type: "text", required: true },
    { name: "description", label: "description", type: "text", required: true },
    { name: "description", label: "description", type: "text", required: true },
    { name: "price", label: "price", type: "text", required: true },
    {
      name: "service_date",
      label: "service_date",
      type: "date",
      required: true,
    },
  ];

  return (
    <>
      <DataTable
        data={services}
        columns={columns || []}
        add={"Add Service"}
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
          createEntity={createService}
          setShowModal={handleCancel}
        />
      </Modal>
    </>
  );
}
