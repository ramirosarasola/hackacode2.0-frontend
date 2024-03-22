import { useState } from "react";
import { Button, Input, Space } from "antd";
import { Service } from "@/interface/types";
import { deleteService, updateService } from "@/lib/slices/serviceSlice";
import { TableProps } from "antd";
import { Edit, Delete, Save } from "@mui/icons-material";

const initialState = {
  service_code: "",
  description: "",
  price: 0,
  service_date: "",
};

// Funciones para manejar la edición de datos
export const useEditFunctions = (services: Service[], dispatch: any) => {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialState);
  const [editingKey, setEditingKey] = useState(0);

  const handleEdit = (id: number) => {
    setEditing(true);
    setEditingKey(id);
    const record = services.find((item) => id === item.id || initialState);
    if(record === undefined) return setEditedData(initialState);
    setEditedData(record);
  };

  const handleSave = (id: number) => {
    setEditing(false);
    setEditingKey(0);
    dispatch(updateService({ id, data: editedData }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteService(id));
  };

  return { editing, editedData, editingKey,setEditedData ,handleEdit, handleSave, handleDelete };
};

// Función para obtener las columnas de la tabla
export const getTableColumns = (editFunctions: any): TableProps<Service>["columns"] => {
  const { editing, editedData, editingKey, setEditedData ,handleEdit, handleSave, handleDelete } = editFunctions;

  return [
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
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          {!editing ? (
              <Button type="default" onClick={() => handleEdit(record.id)} className="border-none bg-transparent shadow-none">
                <Edit className="text-yellow-400"/>
              </Button>
            ) : (
              <Button type="dang" onClick={() => handleSave(record.id)} className="border-none bg-transparent shadow-none">
                <Save className="text-blue-500"/>
              </Button>
            )}
            <Button type="default" onClick={() => handleDelete(record.id)} className="border-none bg-transparent shadow-none">
                <Delete className="text-red-500"/>
            </Button>
        </Space>
      ),
    },
  ];
};
