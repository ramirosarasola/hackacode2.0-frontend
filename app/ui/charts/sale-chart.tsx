import { AreaChart } from "@tremor/react";

const chartdata = [
  {
    date: "January",
    Online: 2890,
  },
  {
    date: "February",
    Online: 3440,
  },
  {
    date: "March",
    Online: 3200,
  },
  {
    date: "April",
    Online: 4670,
  },
  {
    date: "May",
    Online: 4680,
  },
  {
    date: "June",
    Online: 4680,
  },
  {
    date: "July",
    Online: 4680,
  },
  {
    date: "August",
    Online: 4680,
  },
  {
    date: "September",
    Online: 4680,
  },
  {
    date: "October",
    Online: 4680,
  },
  {
    date: "November",
    Online: 4680,
  },
  {
    date: "December",
    Online: 4680,
  },
];

const valueFormatter = function (number: number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

export function SaleChart({ title }: { title: string }) {
  return (
    <div className="bg-white p-4 rounded-md w-full h-[400px]">
      <h3 className="text-[#1F1F1F] text-[16px] font-[400]">{title}</h3>
      <p className="text-[#6A6E83] font-semibold">$34,567</p>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="date"
        yAxisWidth={65}
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
