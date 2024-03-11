import { AreaChart } from '@tremor/react';

const chartdata = [
  {
    date: 'Monday',
    'Online': 2890,
    'Store': 500,
  },
  {
    date: 'Tuesday',
    'Online': 2756,
    'Store': 700,
  },
  {
    date: 'Wednesday',
    'Online': 3322,
    'Store': 850,
  },
  {
    date: 'Thursday',
    'Online': 3470,
    'Store': 890,
  },
  {
    date: 'Friday',
    'Online': 3475,
    'Store': 1100,
  },
  {
    date: 'Saturday',
    'Online': 3129,
    'Store': 1300,
  },
  {
    date: 'Sunday',
    'Online': 3490,
    'Store': 1523,
  }
];

const valueFormatter = function (number:number) {
  return '$ ' + new Intl.NumberFormat('us').format(number).toString();
};

export function SaleChart({title}:{title: string}) {
  return (
    <div className='bg-white p-4 rounded-md w-full h-[400px]'>
      <h3 className="text-[#1F1F1F] text-[16px] font-[400]">{title}</h3>
      <p className="text-[#6A6E83] font-semibold">$34,567</p>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="date"
        yAxisWidth={65}
        categories={['Online', 'Store']}
        colors={['indigo', 'orange']}
        valueFormatter={valueFormatter}
      />
    </div>
  );
}