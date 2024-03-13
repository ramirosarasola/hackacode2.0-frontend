"use client";

import { SaleChart } from "../ui/charts/sale-chart";

export default function Admin() {
  return (
    <section className="dashboard-home flex flex-col items-center gap-6">
      {/* UP GRID */}
      <div className="up w-full flex items-center justify-center gap-6 max-h-[400px]">
        <div className="w-[40%] h-full">
          <SaleChart title="Sales last Week" />
        </div>
        <div className="w-[60%] grid grid-cols-3 grid-rows-2 gap-6 min-h-[400px] h-full">
          {/* //? -> TODO: Loop over diferent items and render a respective cards */}
          <div className="bg-white p-4 h-full">1</div>
          <div className="bg-white p-4 h-full">2</div>
          <div className="bg-white p-4 h-full">3</div>
          <div className="bg-white p-4 h-full">4</div>
          <div className="bg-white p-4 h-full">5</div>
          <div className="bg-white p-4 h-full">6</div>
        </div>
      </div>
      {/* DOWN CHART */}
      <div className="down w-full flex items-center justify-center max-h-[400px]">
        <SaleChart title="Sales per month" />
      </div>
    </section>
  );
}
