"use client";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { Button, Input, Table } from "antd";
import "./data-table.css";

interface DataTableProps {
  data: never[];
  columns: TableProps<any>["columns"];
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
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
          className="w-[300px] bg-[#F3F5FF] text-[#6A6E83]"
          placeholder="Search"
          prefix={<SearchOutlined />}
          allowClear
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button
          className={`custom-button rounded-lg ] bg-[#5A81FA] text-[#fff]`}
          icon={<PlusOutlined />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        className="custom-table rounded-xl border-[1px] border-[#CDDEFF]"
      />
    </section>
  );
};

export default DataTable;
