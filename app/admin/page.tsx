"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchEmployeeWithMoreSales, fetchSales } from "@/lib/slices/saleSlice";
import { useEffect, useState } from "react";
import { MainSaleChart } from "../ui/charts/main-sale-chart";
import { SaleChart } from "../ui/charts/sale-chart";
import DataCard from "../ui/home-data-card";
import { Employee } from "@/interface/types";

export default function Admin() {
  const dispatch = useAppDispatch();
  const { employeeWithMoreSales }: any = useAppSelector((state) => state.sale);
  const { employees } = useAppSelector((state) => state.employee);
  const { profitsByPayment }: any = useAppSelector((state) => state.sale);
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchEmployeeWithMoreSales());
    dispatch(fetchSales());
  }, [dispatch]);

  useEffect(() => {
    const employeeFounded = employees.find(
      (employee) => employee?.id === employeeWithMoreSales?.employee_id
    );
    setEmployee(employeeFounded);
  }, [employeeWithMoreSales]);

  const paymentMethodWithHighestProfit = profitsByPayment?.reduce(
    (prev: any, current: any) => {
      return prev.total_profit > current.total_profit ? prev : current;
    }
  ).payment_method;

  const paymentMethodWithMostSales = profitsByPayment?.reduce(
    (prev: any, current: any) => {
      return prev.total_sales > current.total_sales ? prev : current;
    }
  ).payment_method;

  const totalSales = employeeWithMoreSales?.sales_count;
  // const employee = employees.find(employee => employee?.id === employeeWithMoreSales?.employee_id)

  const highestProfit = profitsByPayment?.find(
    (item: any) => item.payment_method === paymentMethodWithHighestProfit
  )?.total_profit;
  const mostSales = profitsByPayment?.find(
    (item: any) => item.payment_method === paymentMethodWithMostSales
  )?.total_sales;

  const profitWithCurrency = `${highestProfit}$`;
  const eWalletProfit = profitsByPayment?.find(
    (item: any) => item.payment_method === "ewallet"
  )?.total_profit;
  const creditProfit = profitsByPayment?.find(
    (item: any) => item.payment_method === "credit"
  )?.total_profit;
  const debitProfit = profitsByPayment?.find(
    (item: any) => item.payment_method === "debit"
  )?.total_profit;
  const eWalletProfitWithCurrency = `${parseFloat(eWalletProfit).toFixed(0)}$`;
  const creditProfitWithCurrency = `${parseFloat(creditProfit).toFixed(0)}$`;
  const debitProfitWithCurrency = `${parseFloat(debitProfit).toFixed(0)}$`;

  return (
    <section className="dashboard-home flex flex-col items-center gap-6">
      {/* UP GRID */}
      <div className="up w-full flex items-center justify-center gap-6 max-h-[400px]">
        <div className="w-[40%] h-full">
          <SaleChart title="Profit per Month" />
        </div>
        <div className="w-[60%] grid grid-cols-3 grid-rows-2 gap-6 min-h-[400px] h-full">
          {/* //? -> TODO: Loop over diferent items and render a respective cards */}
          {employee && (
            <DataCard
              title={"Employee with most sales 2024"}
              date={`${employee.name}  ${employee.lastname}`}
              value={totalSales}
              simbol="+"
              color="success"
              percentage={20}
            />
          )}
          {profitsByPayment && (
            <>
              <DataCard
                title={"Payment method with highest Profit"}
                date={paymentMethodWithHighestProfit}
                value={profitWithCurrency}
                percentage={25}
                simbol="+"
                color="success"

              />
              <DataCard
                title={"Payment method with most Sales"}
                date={paymentMethodWithMostSales}
                value={mostSales}
                percentage={10}
                simbol="-"
                color="error"
              />
            </>
          )}
          <DataCard
            title={"E-Wallet Profit"}
            date={""}
            value={eWalletProfitWithCurrency}
            percentage={5}
            simbol="+"
            color="warning"
          />
          <DataCard
            title={"Credit Profit"}
            date={""}
            value={creditProfitWithCurrency}
            percentage={20}
            simbol="+"
            color="success"
          />
          <DataCard
            title={"Debit Profit"}
            date={""}
            value={debitProfitWithCurrency}
            percentage={10}
            simbol="+"
            color="warning"
          />
        </div>
      </div>
      {/* DOWN CHART */}
      <div className="down w-full flex items-center justify-center max-h-[400px]">
        <MainSaleChart title="Sales per month 2024" />
      </div>
    </section>
  );
}
