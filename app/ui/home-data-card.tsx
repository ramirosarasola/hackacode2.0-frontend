import { Tag } from "antd";

const DataCard = ({
  title,
  date,
  value,
  percentage,
  color,
  simbol,
}: {
  title: string;
  date: string;
  value: any;
  percentage: number;
  color: string;
  simbol: string;
}) => {
  return (
    <div className="card bg-white p-4 h-full text-[#000] flex flex-col justify-between">
      <div className="card-title flex flex-col justify-start items-start">
        <h5 className="card-title font-[500] text-[14px]">{title}</h5>
        <p className="card-text font-[400] text-[14px] text-[#A8B1CF]">
          {date}
        </p>
      </div>
      <div className="card-body flex justify-between items-center">
        <p className="card-value text-[40px] font-[500] text-[#5A81FA]">
          {value}
        </p>
        <Tag color={color}>{` ${simbol}${percentage}%`}</Tag>
      </div>
    </div>
  );
};

export default DataCard;
