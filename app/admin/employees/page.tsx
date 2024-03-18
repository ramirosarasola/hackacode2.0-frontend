"use client";
import EditIconComponent from "@/app/ui/icons/edit-icon";
import OptionsIconComponent from "@/app/ui/icons/settings-icon";
import CustomTooltip from "@/app/ui/tables/custom-tooltip";
import DataTable from "@/app/ui/tables/data-table";
import UserProfile from "@/app/ui/user-profile";
import { Employee } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchEmployees } from "@/lib/slices/employeeSlice";
import { Popconfirm, Space, TableProps, Tag } from "antd";
import React, { useEffect } from "react";

const handleClickOption = (e: React.MouseEvent<HTMLElement>) => {
  console.log("click ", e);
};

const columns: TableProps<Employee>["columns"] = [
  {
    title: "Team Member",
    dataIndex: "name",
    key: "name",
    render: (_, { name, lastname, position }) => (
        <UserProfile name={name} lastname={lastname} position={position} size={"small"} />
    ),
  },

  {
    title: "Salary",
    dataIndex: "salary",
    key: "salary",
    render: (salary) => `$${salary}`,
  },
  {
    title: "Birthdate",
    dataIndex: "birthdate",
    key: "birthdate",
  },
  {
    title: "Nacionality",
    dataIndex: "country",
    key: "nacionality",
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
    render: () => (
      <Space size="middle">
        <EditIconComponent />
        <CustomTooltip />
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
