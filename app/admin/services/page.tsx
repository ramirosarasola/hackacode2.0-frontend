"use client";
import DataTable from "@/app/ui/tables/data-table";
import { Service } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchServices, updateService,  } from "@/lib/slices/serviceSlice";
import { Button, Input, Space, TableProps } from "antd";
import { useEffect, useState } from "react";

export default function Services() {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editingKey, setEditingKey] = useState(0);

  function handleEdit(id: number) {
    setEditing(true);
    setEditingKey(id);
    const record = services.find((item) => id === item.id);
    setEditedData(record);
  }

  function handleSave(id: number) {
    setEditing(false);
    setEditingKey(0);
    dispatch(updateService({ id, data: editedData }));
  }

  const columns: TableProps<Service>["columns"] = [
    {
      title: "Name & ID",
      dataIndex: "name",
      key: "name",
      render: (_, { name, id }) => (
        <div>
          <span className="font-bold">{`${name}`}</span>
          <p>#{id}</p>
        </div>
      ),
    },
    {
      title: "Service Code",
      dataIndex: "service_code",
      key: "service_code",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.service_code}
            onChange={(e) =>
              setEditedData({ ...editedData, service_code: e.target.value })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.description}
            onChange={(e) =>
              setEditedData({ ...editedData, description: e.target.value })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        const editable = record.id === editingKey;
        return editable ? (
          <Input
            value={editedData.price}
            onChange={(e) =>
              setEditedData({ ...editedData, price: e.target.value })
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Service Date",
      dataIndex: "service_date",
      key: "service_date",
      render: (text, record) => {
         const editable = record.id === editingKey;
         const formattedDate = new Date(text).toLocaleDateString('en-EN', { day: 'numeric', month: 'long', year: 'numeric' });
         return editable ? (
           <Input
             value={editedData.service_date}
             onChange={(e) =>
               setEditedData({ ...editedData, service_date: e.target.value })
             }
           />
         ) : (
           formattedDate
         );
      },
     },     
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
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
        </Space>
      ),
    },
  ];

  const dispatch = useAppDispatch();
  const { services, loading, error } = useAppSelector(
    (state) => state.service
  );

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch, editing]);

  return <DataTable data={services} columns={columns} />;
}
