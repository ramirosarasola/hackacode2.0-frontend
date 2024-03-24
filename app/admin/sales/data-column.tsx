import useFormatDate from "@/hooks/useFormatDate";
import { Sale, Service } from "@/interface/types";
import { useAppSelector } from "@/lib/hooks";
import { fetchSales, softDeleteSale, updateSale } from "@/lib/slices/saleSlice";
import { formatDate } from "@/utils/formatters";
import { Delete, Edit, Save } from "@mui/icons-material";
import { Button, Input, Space, TableProps } from "antd";
import { useState } from "react";

export type UpdateSale = {
  id: 0;
  sale_id: 0;
  customer_id: 0;
  employee_id: 0;
  payment_method: "";
};

export const useEditFunctions = (sales: UpdateSale[], dispatch: any) => {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(null as UpdateSale | null);
  const [editingKey, setEditingKey] = useState(0);
  const date = new Date().toISOString();
  const formatDate = useFormatDate(date);
  const { employees } = useAppSelector((state) => state.employee);
  const { customers } = useAppSelector((state) => state.customer);

  const handleEdit = (id: number) => {
    setEditing(true);
    setEditingKey(id);
    const record = sales.find((item) => id === item.sale_id);
    if (record) {
      setEditedData(record);
    }
  };

  const handleSave = (id: number) => {
    setEditing(false);
    setEditingKey(0);
    // dispatch(updateSale({ id, data: editedData }));''
    console.log(editedData);
  };

  const handleDelete = (id: number) => {
    dispatch(softDeleteSale(id)).then((result: any) => {
      if (result.payload.success) {
        dispatch(fetchSales());
      }
    });
  };

  return {
    editing,
    editedData,
    editingKey,
    setEditedData,
    handleEdit,
    handleSave,
    handleDelete,
    employees,
    customers,
  };
};

export const getTableColumns = (
  editFunctions: any
): TableProps<UpdateSale>["columns"] => {
  const {
    editing,
    editedData,
    editingKey,
    setEditedData,
    handleEdit,
    handleSave,
    handleDelete,
    employees,
    customers,
  } = editFunctions;

  return [
    {
      title: "Sale ID",
      dataIndex: "sale_id",
      key: "sale_id",
      render: (text: number) => `#${text}`,
    },
    {
      title: "Employee",
      dataIndex: "employee_id",
      key: "employee_id",
      // Need to render the employee name that matches the employee_id with id of the employees array.
      render: (_, record) => {
        const editable = record.sale_id === editingKey;
        const employee_name = employees.find(
          (employee: any) => employee.id === record.employee_id
        )?.name
        return editable ? (
          <>
            <Input
              value={editedData.employee_id}
              onChange={(e) =>
                setEditedData({ ...editedData, employee_id: e.target.value })
              }
            />
          </>
        ) : (
          <>
            {employee_name}
          </>
        );
        // const employee = employees.find(
        //   (employee: any) => employee.id === employee_id
        // );
        // return employee
        //   ? `${employee?.name} ${employee?.lastname}`
        //   : "Employee not found";
      },
    },
    {
      title: "Customer",
      dataIndex: "customer_id",
      key: "customer_id",
      render: (customer_id: number) => {
        const customer = customers.find(
          (customer: any) => customer.id === customer_id
        );
        return customer
          ? `${customer?.name} ${customer?.lastname}`
          : "Customer not found";
      },
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      render: (text: number) => `$${text}`,
    },
    {
      title: "Fecha",
      dataIndex: "createdAt",
      key: "birthdate",
      render: (text: string) => formatDate(text),
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (text: string) => text[0].toUpperCase() + text.slice(1),
    },
    // list al sale.services array
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
      render: (services: Service[]) =>
        services.map((service: Service) => service.name).join(", "),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, { sale_id }) => (
        <Space size="middle">
          {!editing ? (
            <Button
              type="default"
              onClick={() => handleEdit(sale_id)}
              className="border-none bg-transparent shadow-none"
            >
              <Edit className="text-yellow-400" />
            </Button>
          ) : (
            <Button
              type="default"
              onClick={() => handleSave(sale_id)}
              className="border-none bg-transparent shadow-none"
            >
              <Save className="text-blue-500" />
            </Button>
          )}
          <Button
            type="default"
            onClick={() => handleDelete(sale_id)}
            className="border-none bg-transparent shadow-none"
          >
            <Delete className="text-red-500" />
          </Button>
        </Space>
      ),
    },
  ];
};
