import { useState } from "react";
import { Button, Input, Space, message } from "antd";
import { Customer } from "@/interface/types";
import { deleteCustomer, updateCustomer } from "@/lib/slices/customerSlice";
import { TableProps } from "antd";
import { Edit, Delete, Save } from "@mui/icons-material";
import useFormatDate from "@/hooks/useFormatDate";
import { formatDate } from "@/utils/formatters";


const initialState = {
  name: "",
  lastname: "",
  phone: "",
  address: "",
  email: "",
  dni: "",
  birthdate: "",
};
// Funciones para manejar la edición de datos
export const useEditFunctions = (customers: Customer[], dispatch: any) => {
  const date = new Date();
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialState);
  const [editingKey, setEditingKey] = useState(0);
  const formatDate = useFormatDate(date.toISOString());

  const handleEdit = (id: number) => {
    setEditing(true);
    setEditingKey(id);
    const record = customers.find((item) => id === item.id || initialState);
    if(record === undefined) return setEditedData(initialState);
    setEditedData(record);
  };

  const handleSave = (id: number) => {
    setEditing(false);
    setEditingKey(0);
    dispatch(updateCustomer({ id, data: editedData })).then((result: any) => {
      if (result.payload.success) {
        message.success('Customer updated successfully.');
      } else {
        message.error('Failed to update customer. Please try again.');
      }
    });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCustomer(id));
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
): TableProps<Customer>["columns"] => {
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
      title: "Birthdate",
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
          formatDate(text)
        );
      },
    },
    {
      title: "Nationality",
      dataIndex: "country",
      key: "country",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData?.country}
            onChange={(e) =>
              setEditedData({ ...editedData, country: e.target.value })
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
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          {!editing ? (
              <Button type="default" onClick={() => handleEdit(record.id)} className="border-none bg-transparent shadow-none">
                <Edit className="text-[##33363F]"/>
              </Button>
            ) : (
              <Button type="default" onClick={() => handleSave(record.id)} className="border-none bg-transparent shadow-none">
                <Save className="text-[##33363F]"/>
              </Button>
            )}
            <Button type="default" onClick={() => handleDelete(record.id)} className="border-none bg-transparent shadow-none">
                <Delete className="text-[##33363F]"/>
            </Button>
        </Space>
      ),
    },
  ];
};
