import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import "./data-table.css";
import { ColumnsType } from "antd/es/table";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnsType<T>;
  add: string;
  addFunction: () => void;
}

const DataTable: React.FC<DataTableProps<any>> = ({
  data,
  columns = [] as ColumnsType<any>,
  add,
  addFunction,
}: DataTableProps<any>) => {
  function handleSearch(value: string): void {
    console.log("Search value:", value);
    // Aquí deberías implementar la lógica para filtrar los datos según el valor de búsqueda
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
          className="custom-button rounded-lg bg-[#5A81FA] text-[#fff]"
          icon={<PlusOutlined />}
          onClick={addFunction}
        >
          {add}
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
