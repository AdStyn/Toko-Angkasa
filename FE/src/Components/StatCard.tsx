import React from "react";

interface StatCardProps {
  title: string;
  amount: string;
  currentValue: number;
  previousValue: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  amount,
  currentValue,
  previousValue,
}) => {
  const isUp = currentValue >= previousValue;
  const iconUrl = isUp ? "/naik.png" : "/turun.png";

  const growthPercentage =
    previousValue === 0
      ? 100
      : Math.abs(
          ((currentValue - previousValue) / previousValue) * 100
        ).toFixed(0);

  return (
    <div className="bg-[#4D81F1] text-white px-8 py-10 rounded-2xl shadow-lg flex flex-col w-full max-w-[340px] min-h-[200px] justify-between mx-auto">
      {/* Label */}
      <h3 className="text-2xl font-semibold">{title}</h3>

      {/* Value */}
      <p className="text-4xl font-bold mt-4">{amount}</p>

      {/* Trend */}
      <div className="flex items-center gap-3 mt-5">
        <img src={iconUrl} alt={isUp ? "Naik" : "Turun"} className="w-6 h-6" />
        <span className="text-lg font-semibold">
          {isUp ? "+" : "-"}
          {growthPercentage}%
        </span>
      </div>
    </div>
  );
};

export default StatCard;
