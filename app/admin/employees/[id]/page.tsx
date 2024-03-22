'use client'
import { useParams } from "next/navigation"
import { Tag } from "@mui/icons-material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchEmployee } from "@/lib/slices/employeeSlice";

export default function EmployeePage () {
    const dispatch = useAppDispatch();
    const  params  = useParams();
    const id = params?.id;
    const { employee } = useAppSelector((state) => state.employee);
    console.log(employee);
    console.log(id)

    useEffect(() => {
        dispatch(fetchEmployee(id));
    }, [id, dispatch]);

    if (!employee) {
        <h1>Loading...</h1>
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
              <Tag className="border-[#5A81FA] border-[1.5px] rounded-full">
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
                  {employee?.birthdate}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Nacionality: </span>{" "}
                  {employee?.country}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Email Adress: </span>{" "}
                  
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
              <span className="w-[140px] text-[#CDDEFF]">Amount of Sales:</span>{" "}
              
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#CDDEFF]">Total Profit:</span>
              {"$ "}
              
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#CDDEFF]">Account Number:</span>{" "}
              {employee?.dni}
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#CDDEFF]">SSN:</span>{" "}
              {employee?.dni}
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
              <div className="flex flex-col gap-2">
                {/* Information */}
                <p>
                  <span className="text-[#A8B1CF] "> Date of Birth: </span>{" "}
                  {employee?.birthdate}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Nacionality: </span>{" "}
                  {employee?.country}
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Email Adress: </span>{" "}
                  
                </p>
                <p>
                  <span className="text-[#A8B1CF] "> Phone: </span>{" "}
                  {employee?.phone}
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
              {employee?.address}
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#CDDEFF]">Address:</span>{" "}
              {employee?.address}
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#CDDEFF]">Address:</span>{" "}
              {employee?.address}
            </li>
            <li className="w-full flex gap-2">
              <span className="w-[140px] text-[#CDDEFF]">Address:</span>{" "}
              {employee?.address}
            </li>
          </ul>
        </div>
      </div>
    </section>
    );
}