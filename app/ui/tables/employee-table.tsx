"use client";
import { Space, Table, Tag, Input, Button } from "antd";
import type { TableProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { fetchEmployees } from "@/lib/slices/employeeSlice";
import { Employee } from "@/interface/types";
import UserProfile from "../user-profile";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import './employee-table.css';

const columns: TableProps<Employee>["columns"] = [
  {
    title: "Team Member",
    dataIndex: "name",
    key: "name",
    render: (_, { name, lastname, position }) => (
      <UserProfile name={name} lastname={lastname} position={position} />
    ),
  },

  {
    title: "Salary",
    dataIndex: "salary",
    key: "salary",
    render: (salary) => (`$${salary}`)
  },
  {
    title: "Status",
    dataIndex: "id", // should change after backend is updated. 😊
    key: "status",
    render: (id) => {
      return (
        <Tag
          className={`border-[#5A81FA] border-[1.5px] rounded-full ${
            id % 2 !== 0
              ? "text-[#fff] bg-[#5A81FA]"
              : "bg-[#fff] text-[#5A81FA] "
          }`}
        >
          {id % 2 !== 0 ? "Active" : "Inactive"}
        </Tag>
      );
    },
  },
  {
    title: "Email Address",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
    render: (position) => {
      return (
        <Tag
          className={`border-[#5A81FA] border-[1.5px] rounded-full ${
            position === "manager"
              ? "text-[#fff] bg-[#5A81FA]"
              : "bg-[#fff] text-[#5A81FA] "
          }`}
        >
          {position[0].toUpperCase() + position.slice(1)}
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
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const EmployeeTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  function handleSearch(value: string): void {
    throw new Error("Function not implemented.");
  }

  function handleAddUser(
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void {
    console.log("Add User button clicked");
  }

  return (
    <section className="employee bg-white p-6">
      <div className="flex items-center justify-end gap-4 mb-6">
        <Input
          className="w-[300px]"
          placeholder="Search employees"
          prefix={<SearchOutlined />}
          allowClear
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button
          className="rounded-xl border-[1px] border-[#5A81FA] bg-[#5A81FA] text-[#fff]"
          icon={<PlusOutlined />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </div>
      <Table
        style={{ fontFamily: "Poppins" }}
        rowKey="id"
        columns={columns}
        dataSource={employees}
        className="rounded-xl border-[1px] border-[#5A81FA]"
      />
    </section>
  );
};

export default EmployeeTable;
