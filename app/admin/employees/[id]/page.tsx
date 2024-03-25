"use client";
import { useParams } from "next/navigation";
import { Tag } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchEmployee } from "@/lib/slices/employeeSlice";
import { fetchUsers } from "@/lib/slices/authSlice";
import { getSalesByEmployee } from "@/lib/slices/saleSlice";
import { formatDate } from "@/utils/formatters";
import { Employee } from "@/interface/types";

export default function EmployeePage() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id: any = params?.id;
  const { users } = useAppSelector((state) => state.auth);
  const { employee }: any = useAppSelector((state) => state.employee);
  const { saleByEmployee }: any = useAppSelector((state) => state.sale);
  

  useEffect(() => {
    dispatch(fetchEmployee(id));
    dispatch(fetchUsers());
    dispatch(getSalesByEmployee(id));
  }, [dispatch]);

  const userEmployee =
    users?.find((user) => user.id === employee?.user_id) || null;

  if (!employee) {
    <h1>Loading...</h1>;
  } 

  return (
    <section className="bg-white p-6 flex flex-col justify-between items-center gap-16 text-[#000]">
      {/* ProfileHeader */}
      <div className="profile-header h-[5rem] w-full border-b border-[#CDDEFF] text-[#000]">
        <h5>{`${employee?.name} ${employee?.lastname}`}</h5>
        <p className="text-[#A8B1CF]">@{employee?.name}</p>
      </div>

      {/* ProfileContent */}
      <div className=" w-full flex gap-8 ">
        {/* Personal Details Card */}
        <article className="w-[70%] h-[315px]  border border-[#CDDEFF] rounded-lg ">
          <div className="card-title h-[75px] border-b border-[#cddeff] text-[#000] flex px-6 items-center">
            Personal Details
          </div>

          <div className="profile-section px-6 flex justify-between items-center">
            <div className="w-[30%] h-full flex flex-col items-center justify-center py-4 gap-2">
              <div className="profile-img w-[70px] h-[70px] rounded-full bg-red-400 text-[#fff] flex items-center justify-center text-[18px]">
                {employee
                  ? employee.name[0].toUpperCase() +
                    employee.lastname[0].toUpperCase()[0]
                  : ""}
              </div>
              <h5>{`${employee?.name} ${employee?.lastname}`}</h5>
              <Tag className="border-[#5A81FA] text-[#5A81FA] bg-transparent border-[1.5px] m-0 py-[3px] px-[10px] rounded-full">
                {employee?.position}
              </Tag>
            </div>

            <div className="flex w-[70%] h-full items-center justify-between py-4">
              <div className="flex flex-col flex-1 gap-2">
                {/* Information */}
                <p>
                  <span className="text-[#A8B1CF] "> First Name: </span>{" "}
                  {employee?.name}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Last Name: </span>{" "}
                  {employee?.lastname}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Position: </span>{" "}
                  {employee?.position}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Salary: </span> $
                  {employee?.salary}
                </p>
              </div>
              <div className="flex flex-col flex-1 gap-2">
                {/* User Information */}
                <p>
                  <span className="text-[#A8B1CF] "> Date of Birth: </span>{" "}
                  {formatDate(employee?.birthdate)}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Nacionality: </span>{" "}
                  {employee?.country}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Email Adress: </span>{" "}
                  {userEmployee?.email}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Phone: </span>{" "}
                  {employee?.phone}
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Payment Details */}
        <div className="w-[30%] h-[315px] border border-[#CDDEFF] rounded-lg">
          <div className="card-title h-[75px] border-b border-[#cddeff] text-[#000] flex px-6 items-center">
            Payment Details
          </div>
          <ul className="profile-section w-[90%] m-auto h-full flex flex-col items-start  justify-center gap-4">
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#A8B1CF]">Amount of Sales:</span>{" "}
              {saleByEmployee && saleByEmployee.count}
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#A8B1CF]">Total Profit:</span>
              {"$ "}
              {saleByEmployee && saleByEmployee.total}
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#A8B1CF]">Account Number:</span>{" "}
              {employee?.dni}
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#A8B1CF]">SSN:</span>{" "}
              {employee?.dni}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
