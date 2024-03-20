"use client";

import { SaleChart } from "../ui/charts/sale-chart";
import DataCard from "../ui/home-data-card";
import { fetchEmployeeWithMoreSales } from "@/lib/slices/saleSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { stat } from "fs";

export default function Admin() {

  const dispatch = useAppDispatch();
  const { employeeWithMoreSales } = useAppSelector(state => state.sale);
  const { employees } = useAppSelector(state => state.employee)

  useEffect(() => {
    dispatch(fetchEmployeeWithMoreSales())
  }, [dispatch])

  const totalSales = employeeWithMoreSales?.sales_count;
  const employee = employees.find(employee => employee?.id === employeeWithMoreSales?.employee_id)
 
  return (
    <section className="dashboard-home flex flex-col items-center gap-6">
      {/* UP GRID */}
      <div className="up w-full flex items-center justify-center gap-6 max-h-[400px]">
        <div className="w-[40%] h-full">
          <SaleChart title="Profit per Month" />
        </div>
        <div className="w-[60%] grid grid-cols-3 grid-rows-2 gap-6 min-h-[400px] h-full">
          {/* //? -> TODO: Loop over diferent items and render a respective cards */}
          { employee && 
            <DataCard title={"Most sales 2024"} date={`${employee.name}  ${employee.lastname}`} value={totalSales} percentage={20} />
          }
          <DataCard title={"Most sales 2023"} date={"September"} value={88} percentage={20} />
          <DataCard title={"Most sales 2023"} date={"September"} value={88} percentage={20} />
          <DataCard title={"Most sales 2023"} date={"September"} value={88} percentage={20} />
          <DataCard title={"Most sales 2023"} date={"September"} value={88} percentage={20} />
          <DataCard title={"Most sales 2023"} date={"September"} value={88} percentage={20} />
        </div>
      </div>
      {/* DOWN CHART */}
      <div className="down w-full flex items-center justify-center max-h-[400px]">
        <SaleChart title="Sales per month" />
      </div>
    </section>
  );
}
