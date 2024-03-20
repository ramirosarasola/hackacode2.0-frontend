import { AreaChart } from "@tremor/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { fetchSales } from "@/lib/slices/saleSlice";
import { valueFormatter } from "@/utils/formatters";

export function MainSaleChart({ title }: { title: string }) {
  const { sales, loading } = useAppSelector((state) => state.sale);
  const [totalSales, setTotalSales] = useState(0);
  const dispatch = useAppDispatch();
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  useEffect(() => {
    if (sales.length > 0) {
       let total = 0;
       const salesOf2024 = sales.filter(sale => new Date(sale.createdAt).getFullYear() === 2024);
   
       const salesByMonth = salesOf2024.reduce((acc, sale) => {
         const month = new Date(sale.createdAt).toLocaleString("en-US", {
           month: "long",
         });
         const totalPrice = sale.services.reduce(
           (sum, service) => sum + parseFloat(service.price),
           0
         );
         acc[month] = (acc[month] || 0) + totalPrice;
         total += totalPrice;
         return acc;
       }, {});
   
       const chartData = Object.entries(salesByMonth).map(([month, total]) => ({
         date: month,
         Online: total,
       }));
   
       setChartData(chartData);
       setTotalSales(total);
    }
   }, [sales]);

  return (
    <div className="bg-white p-4 rounded-md w-full h-[400px]">
      <h3 className="text-[#1F1F1F] text-[16px] font-[400]">{title}</h3>
      <p className="text-[#6A6E83] font-semibold">
        Total: {valueFormatter(totalSales)}
      </p>
      <AreaChart
        className="mt-4 h-72"
        data={chartData}
        index="date"
        categories={["Online"]}
        colors={["indigo", "orange"]}
        valueFormatter={valueFormatter}
        showAnimation={true}
        showGridLines={true}
        tremor-border-radius="20px color-primary-500"
      />
    </div>
  );
}
