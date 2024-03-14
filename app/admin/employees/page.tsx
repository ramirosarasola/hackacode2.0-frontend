"use client";
import DataTable from "@/app/ui/tables/data-table";
import UserProfile from "@/app/ui/user-profile";
import { Employee } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchEmployees } from "@/lib/slices/employeeSlice";
import { Space, TableProps, Tag } from "antd";
import { useEffect } from "react";

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
    render: (salary) => `$${salary}`,
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

export default function Employees() {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return <DataTable data={employees} columns={columns} />;
}
