import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import StatCard from "../Components/StatCard";
import Chart from "../Components/Chart";
import StokRendah from "../Components/StokRendah";
import axios from "axios";

const Dashboard: React.FC = () => {
  const tanggalSekarang = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const [pengeluaranSekarang, setPengeluaranSekarang] = useState(0);
  const [pengeluaranSebelumnya, setPengeluaranSebelumnya] = useState(0);

  useEffect(() => {
    const fetchPengeluaran = async () => {
      try {
        const now = new Date();
        const bulan = now.getMonth() + 1;
        const tahun = now.getFullYear();

        const resSekarang = await axios.get(
          `https://grx6wqmr-3004.asse.devtunnels.ms/transaksi/pengeluaran?bulan=${bulan}&tahun=${tahun}`
        );

        const totalSekarang = resSekarang.data.data.reduce(
          (acc: number, item: any) => acc + (item.hargaperTransaksi || 0),
          0
        );
        setPengeluaranSekarang(totalSekarang);

        const bulanLalu = bulan - 1 === 0 ? 12 : bulan - 1;
        const tahunLalu = bulan - 1 === 0 ? tahun - 1 : tahun;

        const resSebelumnya = await axios.get(
          `https://grx6wqmr-3004.asse.devtunnels.ms/transaksi/pengeluaran?bulan=${bulanLalu}&tahun=${tahunLalu}`
        );

        const totalSebelumnya = resSebelumnya.data.data.reduce(
          (acc: number, item: any) => acc + (item.hargaperTransaksi || 0),
          0
        );
        setPengeluaranSebelumnya(totalSebelumnya);
      } catch (error) {
        console.error("❌ Gagal mengambil data pengeluaran", error);
      }
    };

    fetchPengeluaran();
  }, []);

  return (
    <Sidebar>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 text-left sm:text-start">
          Dashboard
        </h1>

        <div className="text-left sm:text-right">
          <p className="text-sm sm:text-lg text-gray-700 font-medium">
            Tanggal:
          </p>
          <p className="text-base sm:text-2xl font-bold text-[#4D81F1]">
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
          amount={`Rp. ${pengeluaranSekarang.toLocaleString("id-ID")}`}
          currentValue={pengeluaranSekarang}
          previousValue={pengeluaranSebelumnya}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart />
        <StokRendah />
      </div>
    </Sidebar>
  );
};

export default Dashboard;
