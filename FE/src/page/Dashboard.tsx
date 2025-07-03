import React from "react";
import Sidebar from "../Components/Sidebar";
import StatCard from "../Components/StatCard";
import Chart from "../Components/Chart";
import StokRendah from "../Components/StokRendah";

const DashboardAdmin: React.FC = () => {
  const tanggalSekarang = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <Sidebar>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-left sm:text-start">
          Dashboard
        </h1>

        <div className="text-left sm:text-right">
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            Tanggal:
          </p>
          <p className="text-lg sm:text-2xl font-bold text-[#4D81F1]">
            {tanggalSekarang}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Laba"
          amount="Rp. 100.000"
          currentValue={100000}
          previousValue={70000}
        />
        <StatCard
          title="Pemasukkan"
          amount="Rp. 0"
          currentValue={0}
          previousValue={30000}
        />
        <StatCard
          title="Pengeluaran"
          amount="Rp. 0"
          currentValue={0}
          previousValue={0}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart />
        <StokRendah />
      </div>
    </Sidebar>
  );
};

export default DashboardAdmin;
