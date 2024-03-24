import UserProfile from "@/app/ui/user-profile";
import { Employee } from "@/interface/types";
import {
  fetchEmployees,
  softDeleteEmployee,
  updateEmployee,
} from "@/lib/slices/employeeSlice";
import { formatDate } from "@/utils/formatters";
import { Button, Input, Space, TableProps, Tag } from "antd";
import { useState } from "react";
import { Edit, Delete, Save } from "@mui/icons-material";
import useFormatDate from "@/hooks/useFormatDate";

const initialState = {
  user_id: 0,
  name: "",
  lastname: "",
  address: "",
  dni: "",
  birthdate: "",
  country: "",
  phone: "",
  position: "",
  salary: 0,
};

export const useEditFunctions = (employees: Employee[], dispatch: any) => {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialState);
  const [editingKey, setEditingKey] = useState(0);
  const date = new Date();
  const formatDate = useFormatDate(date.toISOString());

  const handleEdit = (id: number) => {
    setEditing(true);
    setEditingKey(id);
    const record = employees.find((item) => id === item.id) || initialState;
    setEditedData(record);
  };

  const handleSave = (id: number) => {
    setEditing(false);
    setEditingKey(0);
    dispatch(updateEmployee({ id, data: editedData }));
  };

  const handleDelete = (id: number) => {
    dispatch(softDeleteEmployee(id));
    dispatch(fetchEmployees());
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
): TableProps<Employee>["columns"] => {
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
      title: "Team Member",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <>
            <Input
              value={editedData.name}
              onChange={(e) =>
                setEditedData({ ...editedData, name: e.target.value })
              }
            />
            <Input
              value={editedData.lastname}
              onChange={(e) =>
                setEditedData({ ...editedData, lastname: e.target.value })
              }
            />
            <Input
              value={editedData.position}
              onChange={(e) =>
                setEditedData({ ...editedData, position: e.target.value })
              }
            />
          </>
        ) : (
          <UserProfile
            id={record.id}
            name={record.name}
            lastname={record.lastname}
            position={record.position}
            size={"small"}
          />
        );
      },
    },

    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.salary}
            onChange={(e) =>
              setEditedData({ ...editedData, salary: e.target.value })
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
            value={editedData.birthdate}
            onChange={(e) =>
              setEditedData({
                ...editedData,
                birthdate: e.target.value,
              })
            }
          />
        ) : (
          formatDate(text)
        );
      },
    },
    {
      title: "Nacionality",
      dataIndex: "country",
      key: "nacionality",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.country}
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
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.position}
            onChange={(e) =>
              setEditedData({ ...editedData, position: e.target.value })
            }
          />
        ) : (
          <Tag
            className={`border-[#5A81FA] border-[1.5px] rounded-full ${
              record.position === "manager"
                ? "text-[#fff] bg-[#5A81FA]"
                : "bg-[#fff] text-[#5A81FA] "
            }`}
          >
            {record.position[0].toUpperCase() + record.position.slice(1)}
          </Tag>
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
            <Button
              type="default"
              onClick={() => handleEdit(record.id)}
              className="border-none bg-transparent shadow-none"
            >
              <Edit className="text-yellow-400" />
            </Button>
          ) : (
            <Button
              type="default"
              onClick={() => handleSave(record.id)}
              className="border-none bg-transparent shadow-none"
            >
              <Save className="text-blue-500" />
            </Button>
          )}
          <Button
            type="default"
            onClick={() => handleDelete(record.id)}
            className="border-none bg-transparent shadow-none"
          >
            <Delete className="text-red-500" />
          </Button>
        </Space>
      ),
    },
  ];
};
