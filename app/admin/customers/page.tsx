"use client";
import EditIconComponent from "@/app/ui/icons/edit-icon";
import OptionsIconComponent from "@/app/ui/icons/settings-icon";
import DataTable from "@/app/ui/tables/data-table";
import { Customer } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { deleteCustomer, fetchCustomers, updateCustomer } from "@/lib/slices/customerSlice";
import { Button, Input, Space, TableProps } from "antd";
import { useEffect, useState } from "react";

export default function Customers() {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editingKey, setEditingKey] = useState(0);

  function handleEdit(id: number) {
    setEditing(true);
    setEditingKey(id);
    const record = customers.find((item) => id === item.id);
    setEditedData(record);
  }

  function handleSave(id: number) {
    setEditing(false);
    setEditingKey(0);
    dispatch(updateCustomer({ id, data: editedData }));
  }

  function handleDelete(id: number) {
    dispatch(deleteCustomer(id));
  }

  function handleAddCustomer() {
    console.log("add customer");
  }

  const columns: TableProps<Customer>["columns"] = [
    {
      title: "Name & ID",
      dataIndex: "name",
      key: "name",
      render: (_, { name, lastname, id }) => (
        <div>
          <span className="font-bold">{`${name} ${lastname}`}</span>
          <p>#{id}</p>
        </div>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.phone}
            onChange={(e) =>
              setEditedData({ ...editedData, phone: e.target.value })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.address}
            onChange={(e) =>
              setEditedData({ ...editedData, address: e.target.value })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.email}
            onChange={(e) =>
              setEditedData({ ...editedData, email: e.target.value })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.dni}
            onChange={(e) =>
              setEditedData({ ...editedData, dni: e.target.value })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Birthdate & Nationality",
      dataIndex: "birthdate",
      key: "birthdate",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData?.birthdate}
            onChange={(e) =>
              setEditedData({ ...editedData, birthdate: e.target.value })
            }
          />
        ) : (
          text
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
              Editar
            </Button>
          ) : (
            <Button type="default" onClick={() => handleSave(record.id)}>
              Guardar
            </Button>
          )}
          <Button type="default" danger onClick={() => handleDelete(record.id)}>Borrar</Button>
        </Space>
      ),
    },
  ];

  const dispatch = useAppDispatch();
  const { customers, loading, error } = useAppSelector(
    (state) => state.customer
  );

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch, editing]);

  return <DataTable data={customers} columns={columns} add={"Add Customer"} addFunction={handleAddCustomer} />;
}
