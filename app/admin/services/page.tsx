"use client";
import { AuthInput } from "@/app/ui/auth-input";
import DataTable from "@/app/ui/tables/data-table";
import { Service } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createService,
  deleteService,
  fetchServices,
  updateService,
} from "@/lib/slices/serviceSlice";
import { Button, Input, Space, TableProps, Modal } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Services() {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editingKey, setEditingKey] = useState(0);

  function handleEdit(id: number) {
    setEditing(true);
    setEditingKey(id);
    const record = services.find((item) => id === item.id);
    setEditedData(record);
  }

  function handleSave(id: number) {
    setEditing(false);
    setEditingKey(0);
    dispatch(updateService({ id, data: editedData }));
  }

  function handleDelete(id: number) {
    dispatch(deleteService(id));
  }

  function handleAddService() {
    showModal();
    console.log("add service");
  }

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const columns: TableProps<Service>["columns"] = [
    {
      title: "Name & ID",
      dataIndex: "name",
      key: "name",
      render: (_, { name, id }) => (
        <div>
          <span className="font-bold">{`${name}`}</span>
          <p>#{id}</p>
        </div>
      ),
    },
    {
      title: "Service Code",
      dataIndex: "service_code",
      key: "service_code",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.service_code}
            onChange={(e) =>
              setEditedData({ ...editedData, service_code: e.target.value })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.description}
            onChange={(e) =>
              setEditedData({ ...editedData, description: e.target.value })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.price}
            onChange={(e) =>
              setEditedData({ ...editedData, price: e.target.value })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Service Date",
      dataIndex: "service_date",
      key: "service_date",
      render: (text, record) => {
        const editable = record.id === editingKey;
        const formattedDate = new Date(text).toLocaleDateString("en-EN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        return editable ? (
          <Input
            value={editedData.service_date}
            onChange={(e) =>
              setEditedData({ ...editedData, service_date: e.target.value })
            }
          />
        ) : (
          formattedDate
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Space size="middle">
          {!editing ? (
            <Button type="default" onClick={() => handleEdit(record.id)}>
              Edit
            </Button>
          ) : (
            <Button type="default" onClick={() => handleSave(record.id)}>
              Save
            </Button>
          )}
          <Button type="default" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const dispatch = useAppDispatch();
  const { services, loading, error } = useAppSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch, editing, open]);

  const { register, handleSubmit, reset } = useForm<Service>();

  const onSubmit: SubmitHandler<Service> = (formData: Service) => {
    console.log(formData);
    dispatch(createService(formData));
    setOpen(false);
    reset();
  };

  return (
    <>
      <DataTable
        data={services}
        columns={columns}
        add={"Add Service"}
        addFunction={handleAddService}
      />
      <Modal
        title="New Service"
        open={open}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        okButtonProps={{ disabled: false, type: "default" }}
        cancelButtonProps={{ disabled: false, type: "default" }}
      >
        <form action="" className="flex flex-col gap-4 mt-8">
          <AuthInput
            autoComplete="#000"
            type="text"
            label="service_code"
            register={register}
            required
            placeholder="Service Code"
          />
          <AuthInput
            autoComplete="#000"
            type="text"
            label="name"
            register={register}
            required
            placeholder="Name"
          />
          <AuthInput
            autoComplete="#000"
            type="text"
            label="description"
            register={register}
            required
            placeholder="Description"
          />
          <AuthInput
            autoComplete="#000"
            type="date"
            label="service_date"
            register={register}
            required
            placeholder="Service Date"
          />
          <AuthInput
            autoComplete="#000"
            type="number"
            label="price"
            register={register}
            required
            placeholder="Price"
          />
        </form>
      </Modal>
    </>
  );
}
