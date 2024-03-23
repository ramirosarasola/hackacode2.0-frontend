"use client";
import { Sale } from "@/interface/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchEmployeeByUserId } from "@/lib/slices/employeeSlice";
import { getSalesByEmployee } from "@/lib/slices/saleSlice";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const employee = {
  id: 1,
  name: "John",
  lastname: "Doe",
  position: "Software Engineer",
  birthdate: "01/01/1990",
  phone: "+1234567890",
  email: "",
  address: "123 Main St",
  country: "USA",
  dni: "123456789",
  salary: "$100,000",
};

const MemoizedEmployeePage = React.memo(function EmployeePage() {
  const { id }: any = useParams();
  const dispatch = useAppDispatch();
  const [userEmployee, setUserEmployee] = useState(employee);
  const { user } = useAppSelector((state) => state.auth);
  const [saleByEmployee, setSaleByEmployee] = useState([] as any);
  const [showSales, setShowSales] = useState(false);

  const countSalesWithMultipleServices = (salesObject: any) => {
    console.log(salesObject);
    let total = 0;
    salesObject.forEach((item: Sale) => {
      if (item.services.length >= 1) {
        total += item.services.length;
      }
    });
    return total;
  };

  useEffect(() => {
    dispatch(fetchEmployeeByUserId(id)).then((result: any) => {
      if (result.payload) {
        setUserEmployee(result.payload.employee);
      }
    });
  }, [dispatch, id]);

  const handleShowSales = () => {
    setShowSales((prev) => !prev);
  };

  console.log(saleByEmployee);

  useEffect(() => {
    dispatch(getSalesByEmployee(userEmployee.id)).then((result: any) => {
      if (result.payload) {
        console.log(result.payload);
        setSaleByEmployee(result.payload.result);
      }
    });
  }, [userEmployee, dispatch, id]);

  const {
    name,
    lastname,
    position,
    birthdate,
    phone,
    email,
    address,
    country,
    dni,
    salary,
  } = userEmployee;

  return (
    <section className="flex flex-col gap-4 w-full h-fit bg-white mx-auto p-4 border-solid border-[1px] border-blue-300 rounded-lg">
      {/* Columna 1 (ocupa todas las filas) */}
      <div className="col-span-2 md:col-span-1  h-fit flex flex-col ">
        {/* create circle as user profile image */}
        <div className="user-profile mt-[1rem] flex flex-col p-4">
          <div className="w-24 h-24 bg-blue-200  rounded-full mb-4"></div>
          <h1 className="text-2xl font-bold text-[#000]">
            {name} {lastname}
          </h1>
          <p className="text-[#000]">{position}</p>
        </div>
      </div>
      {/* Columna 2 (dividida horizontalmente en dos divs) */}
      <div className="flex">
        {/* Primer div ocupa la primera fila */}
        <div className=" h-fit gap-4 p-4 flex-1">
          <h2 className="text-2xl font-bold mb-4 text-[#000]">
            Personal Details
          </h2>
          <ul className="text-black">
            <li className="mb-2">
              <span className="font-semibold">Birthdate:</span> {birthdate}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Phone:</span> {phone}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Email:</span> {user?.email}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Address:</span> {address},{" "}
              {country}
            </li>
            <li className="mb-2">
              <span className="font-semibold">DNI:</span> {dni}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Salary:</span> {salary}
            </li>
          </ul>
        </div>
        <div className=" h-fit gap-4 p-4 flex-1">
          <h2 className="text-2xl font-bold mb-4 text-[#000]">Work Details</h2>
          <ul className="text-black">
            <li className="mb-2">
              <span className="font-semibold">Amount of Sales:</span>{" "}
              {saleByEmployee?.count}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Profit Generated:</span>$
              {saleByEmployee?.total}
            </li>
            <li className="mb-2">
              <span className="font-semibold">Total Services Sold:</span>{" "}
              {countSalesWithMultipleServices(saleByEmployee?.sales || [])}
            </li>
          </ul>
        </div>
        {/* Segundo div ocupa la segunda fila */}
      </div>
      <button onClick={handleShowSales} className="text-[#000]">
        See All Sales
      </button>
      <section className="p-4">
        {showSales &&
          saleByEmployee?.sales?.map((sale, index) => (
            <div key={sale.sale_id} className="text-[#000]">
              <h3 className="font-bold">Venta {index + 1}</h3>
              <ul>
                {sale.services.map((service) => (
                  <li key={service.service_id}>
                    <h4>{service.name}</h4>
                    <p>{service.description}</p>
                    <p>
                      Fecha:{" "}
                      {new Date(service.service_date).toLocaleDateString()}
                    </p>
                    <p>Precio: {service.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </section>
    </section>
  );
});

export default MemoizedEmployeePage;

const renderAchievements = (sales: any) => {
  return sales.map((sale: Sale, index: number) => (
    <div key={index}>
      <h3 className="text-lg font-semibold mb-2">Achievement {index + 1}</h3>
      <ul className="text-black">
        {sale.services.map((service: any, serviceIndex: number) => (
          <li key={serviceIndex} className="mb-2">
            <span className="font-semibold">{service.name}:</span>{" "}
            {service.description}
          </li>
        ))}
      </ul>
    </div>
  ));
};
