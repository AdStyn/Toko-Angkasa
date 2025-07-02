import React from "react";
import Sidebar from "../Components/Sidebar";
import StatCard from "../Components/StatCard";

const DashboardAdmin: React.FC = () => {
  const tanggalSekarang = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <Sidebar>
      {/* Header dalam halaman */}
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

      {/* Statistik Box */}
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

      {/* Grafik dan Tabel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-3 text-sm sm:text-base">
            Grafik Penjualan
          </h2>
          <div className="h-40 sm:h-52 md:h-64 bg-gray-100 flex items-center justify-center text-gray-400 rounded">
            (Grafik penjualan di sini)
          </div>
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-xl shadow p-4 overflow-auto">
          <h2 className="font-semibold mb-3 text-sm sm:text-base">
            Stok Menipis
          </h2>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse min-w-[400px]">
              <thead>
                <tr className="bg-gray-100 text-black text-left">
                  <th className="p-2">No</th>
                  <th className="p-2">Nama</th>
                  <th className="p-2">Kategori</th>
                  <th className="p-2">Stok</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {[
                  "produk a",
                  "produk b",
                  "produk c",
                  "produk d",
                  "produk e",
                ].map((produk, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{produk}</td>
                    <td className="p-2">
                      kategori {String.fromCharCode(97 + i)}
                    </td>
                    <td className="p-2">3 (pakai Tailwind)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default DashboardAdmin;
