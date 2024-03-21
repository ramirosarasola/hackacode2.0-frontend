import { Sale } from "@/interface/types";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { Button, Input, Space, TableProps } from "antd";
import { useState } from "react";

const initialState = {};

export const useEditFunctions = (sales: Sale[], dispatch: any) => {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialState);
  const [editingKey, setEditingKey] = useState(0);

  const { employees } = useAppSelector((state) => state.employee);
  const { customers } = useAppSelector((state) => state.customer);

  const handleEdit = (id: number) => {
    setEditing(true);
    setEditingKey(id);
    const record = sales.find((item) => id === item.id) || initialState;
    setEditedData(record);
  };

  const handleSave = (id: number) => {
    setEditing(false);
    setEditingKey(0);
    // dispatch(updateSale({ id, data: editedData }));
  };

  const handleDelete = (id: number) => {
    // dispatch(deleteSale(id));
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
): TableProps<Sale>["columns"] => {
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
      render: (_, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={record.sale_id}
            onChange={(e) =>
              setEditedData({ ...editedData, sale_id: e.target.value })
            }
          />
        ) : (
          record.sale_id
        );
      },
    },

    {
      title: "Employee",
      dataIndex: "employee_id",
      key: "employee_id",
      render: (text, record) => {
        const editable = record.id === editingKey;
        const employee = employees.find(
          (employee) => employee.id === record.employee_id
        );

        return editable ? (
          <select
            defaultValue={record.employee_id}
            onChange={(e) =>
              setEditedData({ ...editedData, employee_id: e.target.value })
            }
          >
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {`${employee.name} ${employee.lastname}`}
              </option>
            ))}
          </select>
        ) : (
          `${employee?.name} ${employee?.lastname}`
        );
      },
    },
    {
      title: "Customer",
      dataIndex: "customer_id",
      key: "customer_id",
      render: (text, record) => {
        const editable = record.id === editingKey;
        const customer = customers.find(
          (customer) => customer.id === record.customer_id
        );

        return editable ? (
          <select
            defaultValue={record.customer_id}
            onChange={(e) =>
              setEditedData({ ...editedData, customer_id: e.target.value })
            }
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {`${customer.name} ${customer.lastname}`}
              </option>
            ))}
          </select>
        ) : (
          `${customer?.name} ${customer?.lastname}`
        );
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.createdAt}
            onChange={(e) =>
              setEditedData({ ...editedData, createdAt: e.target.value })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
      render: (text, record) => {
        return (
          <select defaultValue="">
            {record.services.map((service, index) => (
              <option key={index} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (_, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={record.payment_method}
            onChange={(e) =>
              setEditedData({ ...editedData, payment_method: e.target.value })
            }
          />
        ) : (
          record.payment_method
        );
      },
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      render: (_, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={record.profit}
            onChange={(e) =>
              setEditedData({ ...editedData, profit: e.target.value })
            }
          />
        ) : (
          record.profit
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => {

        return (
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
            <Button
              type="default"
              danger
              onClick={() => handleDelete(record.id)}
            >
              Borrar
            </Button>
          </Space>
        );
      },
    },
  ];
};
