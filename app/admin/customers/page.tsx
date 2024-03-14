"use client";
import EditIconComponent from "@/app/ui/icons/edit-icon";
import OptionsIconComponent from "@/app/ui/icons/settings-icon";
import DataTable from "@/app/ui/tables/data-table";
import { Customer } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchCustomers } from "@/lib/slices/customerSlice";
import { Settings } from "@mui/icons-material";
import { Space, TableProps, Tag } from "antd";
import { useEffect } from "react";

export default function Customers() {
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
      render: (phone) => <p className="text-[#A8B1CF]">{phone}</p>
    },
    {
      title: "Address",
      dataIndex: "address", // should change after backend is updated. 😊
      key: "address",
      render: (address) => <p className="text-[#A8B1CF]">{address}</p>
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      render: (email) => <p className="text-[#A8B1CF]">{email}</p>
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
      render: (dni) => <p className="text-[#A8B1CF]">{dni}</p>
    },
    {
      title: "Birthdate & Nacionality",
      dataIndex: "birthdate",
      key: "birthdate",
      render: (birthdate) => <p className="text-[#A8B1CF]">{birthdate}</p>
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: () => (
        <Space size="middle">
          <EditIconComponent/>
          <OptionsIconComponent/>
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
  }, [dispatch]);

  console.log({ customers, loading, error });

  return <DataTable data={customers} columns={columns} />;
}
