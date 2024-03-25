import useFormatDate from "@/hooks/useFormatDate";
import { Service } from "@/interface/types";
import { useAppSelector } from "@/lib/hooks";
import { fetchSales, softDeleteSale, updateSale } from "@/lib/slices/saleSlice";
import { formatDate } from "@/utils/formatters";
import { Delete, Edit, Save } from "@mui/icons-material";
import { Button, Input, Select, Space, TableProps, message } from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";

export type UpdateSale = {
  id: 0;
  sale_id: 0;
  customer_id: 0;
  employee_id: 0;
  payment_method: "";
  is_active:1;
  services: [];
};

export const useEditFunctions = (sales: UpdateSale[], dispatch: any) => {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(null as any | null);
  const [editingKey, setEditingKey] = useState(0);
  const date = new Date().toISOString();
  const formatDate = useFormatDate(date);
  const { employees } = useAppSelector((state) => state.employee);
  const { customers } = useAppSelector((state) => state.customer);
  const allServices = useAppSelector((state) => state.service.services);

  const handleEdit = (id: number) => {
    setEditing(true);
    setEditingKey(id);
    const record = sales.find((item) => id === item.sale_id);
    if (record) {
       // Transformar los datos al formato requerido
       const transformedData = {
         customer_id: record.customer_id.toString(),
         employee_id: record.employee_id.toString(),
         is_active: record.is_active === 1, // Convertir 1 a true y cualquier otro valor a false
         payment_method: record.payment_method,
         services: record.services.map((service: any) => ({
           id: service.service_id.toString(), // Convertir el id del servicio a cadena
         })),
       };
       setEditedData(transformedData);
    }
   };
   

   const handleSave = (id: number) => {
    setEditing(false);
    setEditingKey(0);
    
    // Formatear los servicios seleccionados como objetos con la estructura { id: value }
    const formattedServices = editedData.services.map((id: any) => ({ id }));
  
    // Actualizar editedData con los servicios formateados
    const updatedData = { ...editedData, services: formattedServices };
  
    dispatch(updateSale({ id, data: updatedData })).then((result: any) => {
      if (result.payload) {
        dispatch(fetchSales());
        setEditedData(null);
        message.success("Sale updated successfully."); // Mostrar alerta de éxito
      } else {
        message.error("Failed to update sale. Please try again."); // Mostrar alerta de error
      }
    });
    console.log(editedData);
  };
  

  const handleDelete = (id: number) => {
    dispatch(softDeleteSale(id)).then((result: any) => {
      if (result.payload) {
        dispatch(fetchSales());
        message.success("Sale deleted successfully."); // Mostrar alerta de éxito
      } else {
        message.error("Failed to delete sale. Please try again."); // Mostrar alerta de error
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
    allServices,
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
    allServices,
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
      render: (_, record) => {
        const editable = record.sale_id === editingKey;
        const employee_name = employees.find(
          (employee: any) => employee.id === record.employee_id
        )?.name;

        return editable ? (
          <Select
            value={editedData.employee_id}
            onChange={(value) =>
              setEditedData({ ...editedData, employee_id: value })
            }
            style={{ width: 120 }}
          >
            {employees.map((employee: any) => (
              <Select.Option key={employee.id} value={employee.id}>
                {employee.name}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <>{employee_name}</>
        );
      },
    },
    {
      title: "Customer",
      dataIndex: "customer_id",
      key: "customer_id",
      render: (_, record) => {
        const editable = record.sale_id === editingKey;
        const customer_name = customers.find(
          (customer: any) => customer.id === record.customer_id
        )?.name;

        return editable ? (
          <Select
            value={editedData.customer_id}
            onChange={(value) =>
              setEditedData({ ...editedData, customer_id: value })
            }
            style={{ width: 120 }}
          >
            {customers.map((customer: any) => (
              <Select.Option key={customer.id} value={customer.id}>
                {customer.name} {customer.lastname}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <>{customer_name}</>
        );
      },
    },

    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      render: (text: number) => `$${text}`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record: any) => {
        const editable = record.sale_id === editingKey;
        const formattedDate = formatDate(record.createdAt);
        return editable ? (
          <Input
            value={formattedDate}
            onChange={(e) =>
              setEditedData({ ...editedData, createdAt: e.target.value })
            }
          />
        ) : (
          formattedDate
        );
      },
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (text, record) => {
        const editable = record.sale_id === editingKey;
        return editable ? (
          <Select
            value={editedData.payment_method}
            onChange={(value) =>
              setEditedData({ ...editedData, payment_method: value })
            }
            style={{ width: 120 }}
          >
            <Option value="cash">Cash</Option>
            <Option value="credit">Credit</Option>
            <Option value="ewallet">Ewallet</Option>
            <Option value="transfer">Transference</Option>
          </Select>
        ) : (
          text[0].toUpperCase() + text.slice(1)
        );
      },
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
      render: (_, record ) =>

      {
        const editable = record.sale_id === editingKey;
        const services = record.services.map((service: any) => service?.service_id);
        console.log(services);
        
        return editable ? (
          <Select
            mode="multiple"
            value={editedData.services}
            onChange={(value) =>
              setEditedData({ ...editedData, services: value })
            }
            style={{ width: 120 }}
          >
            {allServices.map((service: any) => (
              <Select.Option key={service.id} value={service?.service_id}>
                {service.name}
              </Select.Option>
            ))}
          </Select>
        ) : (
          record.services.map((service: Service) => service?.name).join(", ")
        );
      }
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
