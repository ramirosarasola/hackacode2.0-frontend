import useFormatDate from "@/hooks/useFormatDate";
import { Sale, Service } from "@/interface/types";
import { fetchSales, softDeleteSale, updateSale } from "@/lib/slices/saleSlice";
import { formatDate } from "@/utils/formatters";
import { Delete, Edit, Save } from "@mui/icons-material";
import { Button, Space, TableProps } from "antd";
import { useState } from "react";

export type UpdateSale = {
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
    dispatch(updateSale({ id, data: editedData }));
  };

  const handleDelete = (id: number) => {
    dispatch(softDeleteSale(id)).then((result:any) => {
      if (result.payload.success) {
        dispatch(fetchSales());
      }
      
      
    })
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
): TableProps<UpdateSale>["columns"] => {
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
      title: "Sale ID",
      dataIndex: "sale_id",
      key: "sale_id",
      render: (text: number) => `#${text}`,
    },
    {
      title: "Employee",
      dataIndex: "employee_id",
      key: "employee_id",
    },
    {
      title: "Customer",
      dataIndex: "customer_id",
      key: "customer_id",
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
      render: (services: Service[]) => services.map((service: Service) => service.name).join(", "),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (
        _,
        { sale_id }
      ) => (
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
