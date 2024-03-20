import { Sale } from "@/interface/types";
import { Button, Input, Space, TableProps } from "antd";
import { useState } from "react";

const initialState = {};

export const useEditFunctions = (sales: Sale[], dispatch: any) => {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialState);
  const [editingKey, setEditingKey] = useState(0);

  const handleEdit = (id: number) => {
    setEditing(true);
    setEditingKey(id);
    const record = sales.find((item) => id === item.id) || initialState;
    setEditedData(record);
  };

  const handleSave = (id: number) => {
    setEditing(false);
    setEditingKey(0);
    // dispatch(updateSale({ id, data: editedData }));
  };

  const handleDelete = (id: number) => {
    // dispatch(deleteSale(id));
  };

  return {
    editing,
    editedData,
    editingKey,
    setEditedData,
    handleEdit,
    handleSave,
    handleDelete,
  };
};

export const getTableColumns = (
  editFunctions: any
): TableProps<Sale>["columns"] => {
  const {
    editing,
    editedData,
    editingKey,
    setEditedData,
    handleEdit,
    handleSave,
    handleDelete,
  } = editFunctions;

  return [
    {
      title: "Sale ID",
      dataIndex: "sale_id",
      key: "sale_id",
      render: (_, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.sale_id}
            onChange={(e) =>
              setEditedData({ ...editedData, sale_id: e.target.value })
            }
          />
        ) : (
          record.sale_id
        );
      },
    },

    {
      title: "Employee",
      dataIndex: "employee_id",
      key: "employee_id",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.employee_id}
            onChange={(e) =>
              setEditedData({ ...editedData, employee_id: e.target.value })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Customer",
      dataIndex: "customer_id",
      key: "customer_id",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.customer_id}
            onChange={(e) =>
              setEditedData({
                ...editedData,
                customer_id: e.target.value,
              })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.createdAt}
            onChange={(e) =>
              setEditedData({ ...editedData, createdAt: e.target.value })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
      render: (text, record) => {
        return (
          <select defaultValue="">
            {record.services.map((service) => (
              <option key={service.service_code} value={service.service_code}>
                {service.service_code}
              </option>
            ))}
          </select>
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
          <Button type="default" danger onClick={() => handleDelete(record.id)}>
            Borrar
          </Button>
        </Space>
      ),
    },
  ];
};
