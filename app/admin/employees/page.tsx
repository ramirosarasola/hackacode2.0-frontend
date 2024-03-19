"use client";
import DataTable from "@/app/ui/tables/data-table";
import UserProfile from "@/app/ui/user-profile";
import { Employee } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { deleteEmployee, fetchEmployees, updateEmployee } from "@/lib/slices/employeeSlice";
import { Button, Input, Space, TableProps, Tag } from "antd";
import React, { useEffect, useState } from "react";

const handleClickOption = (e: React.MouseEvent<HTMLElement>) => {
  console.log("click ", e);
};

export default function Employees() {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employee);

  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editingKey, setEditingKey] = useState(0);

  function handleEdit(id: number) {
    setEditing(true);
    setEditingKey(id);
    const record = employees.find((item) => id === item.id);
    setEditedData(record);
  }

  function handleSave(id: number) {
    setEditing(false);
    setEditingKey(0);
    console.log({ id, data: editedData });
    dispatch(updateEmployee({ id, data: editedData }));
  }

  function handleDelete(id: number) {
    dispatch(deleteEmployee(id));
  }

  function handleAddEmployee(){
    console.log('add employee');
    
  }

  const columns: TableProps<Employee>["columns"] = [
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
              setEditedData({ ...editedData, birthdate: e.target.value })
            }
          />
        ) : (
          text
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

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch, editing]);

  return <DataTable data={employees} columns={columns} add="Add Employee" addFunction={handleAddEmployee} />;
}
