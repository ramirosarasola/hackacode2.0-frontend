"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getSalesByEmployee } from "@/lib/slices/saleSlice";
import { Tag } from "antd";
import { get } from "http";
import { useEffect } from "react";

export default function Profile() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { employees } = useAppSelector((state) => state.employee);
  const userEmployee =
    employees.find((employee) => employee.user_id === user.id) || null;

  const { saleByEmployee } = useAppSelector((state) => state.sale);

  // console.log(saleByEmployee);

  useEffect(() => {
    dispatch(getSalesByEmployee(userEmployee?.id));
  }, [dispatch, userEmployee]);


  return (
    <section className="bg-white p-6 flex flex-col justify-between items-center gap-16 text-[#000]">
      {/* ProfileHeader */}
      <div className="profile-header h-[5rem] w-full border-b border-[#CDDEFF] text-[#000]">
        <h5>{`${userEmployee?.name} ${userEmployee?.lastname}`}</h5>
        <p className="text-[#A8B1CF]">@{userEmployee?.name}</p>
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
                {userEmployee
                  ? userEmployee.name[0].toUpperCase() +
                    userEmployee.lastname[0].toUpperCase()[0]
                  : ""}
              </div>
              <h5>{`${userEmployee?.name} ${userEmployee?.lastname}`}</h5>
              <Tag className="border-[#5A81FA] border-[1.5px] rounded-full">
                {userEmployee?.position}
              </Tag>
            </div>

            <div className="flex w-[70%] h-full items-center justify-between py-4">
              <div className="flex flex-col flex-1 gap-2">
                {/* User Information */}
                <p>
                  <span className="text-[#A8B1CF] "> First Name: </span>{" "}
                  {userEmployee?.name}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Last Name: </span>{" "}
                  {userEmployee?.lastname}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Position: </span>{" "}
                  {userEmployee?.position}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Salary: </span> $
                  {userEmployee?.salary}
                </p>
              </div>
              <div className="flex flex-col flex-1 gap-2">
                {/* User Information */}
                <p>
                  <span className="text-[#A8B1CF] "> Date of Birth: </span>{" "}
                  {userEmployee?.birthdate}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Nacionality: </span>{" "}
                  {userEmployee?.country}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Email Adress: </span>{" "}
                  {user?.email}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Phone: </span>{" "}
                  {userEmployee?.phone}
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
              <span className="w-[140px] text-[#CDDEFF]">Amount of Sales:</span>{" "}
              {saleByEmployee && saleByEmployee.count}
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#CDDEFF]">Total Profit:</span>
              {"$ "}
              {saleByEmployee && saleByEmployee.total}
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#CDDEFF]">Account Number:</span>{" "}
              {userEmployee?.dni}
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#CDDEFF]">SSN:</span>{" "}
              {userEmployee?.dni}
            </li>
          </ul>
        </div>
      </div>

      {/* ProfileContent */}
      <div className=" w-full flex gap-8">
        {/* Job Details */}
        <article className="w-[70%] h-[315px]  border border-[#CDDEFF] rounded-lg ">
          <div className="card-title h-[75px] border-b border-[#cddeff] text-[#000] flex px-6 items-center">
            Job Details
          </div>

          <div className="profile-section px-6 flex justify-between items-center">
            <div className="flex gap-4 h-full items-center mx-auto justify-between py-4">
              <div className="flex flex-col gap-2">
                {/* User Information */}
                <p>
                  <span className="text-[#A8B1CF] "> First Name: </span>{" "}
                  {userEmployee?.name}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Last Name: </span>{" "}
                  {userEmployee?.lastname}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Position: </span>{" "}
                  {userEmployee?.position}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Salary: </span> $
                  {userEmployee?.salary}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {/* User Information */}
                <p>
                  <span className="text-[#A8B1CF] "> Date of Birth: </span>{" "}
                  {userEmployee?.birthdate}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Nacionality: </span>{" "}
                  {userEmployee?.country}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Email Adress: </span>{" "}
                  {user?.email}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Phone: </span>{" "}
                  {userEmployee?.phone}
                </p>
              </div>
            </div>
          </div>
        </article>
        {/* Address */}
        <div className="w-[30%] h-[315px]  border border-[#CDDEFF] rounded-lg ">
          <div className="card-title h-[75px] border-b border-[#cddeff] text-[#000] flex px-6 items-center">
            Address
          </div>
          <ul className="profile-section w-[90%] m-auto h-full flex flex-col items-start  justify-center gap-4">
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#CDDEFF]">Address:</span>{" "}
              {userEmployee?.address}
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#CDDEFF]">Address:</span>{" "}
              {userEmployee?.address}
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#CDDEFF]">Address:</span>{" "}
              {userEmployee?.address}
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#CDDEFF]">Address:</span>{" "}
              {userEmployee?.address}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
