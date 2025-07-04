import React, { useEffect, useState } from "react";
import axios from "axios";

type Produk = {
  id: number;
  nama: string;
  kategori: string;
  stok: number;
};

const StokRendah: React.FC = () => {
  const [produkMinimum, setProdukMinimum] = useState<Produk[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMinimumStok = async () => {
      try {
        const response = await axios.get(
          "https://grx6wqmr-3004.asse.devtunnels.ms/product/minimum"
        );
        setProdukMinimum(response.data);
        setError("");
      } catch (err: any) {
        if (err.response?.status === 404) {
          setProdukMinimum([]);
        } else {
          setError("Gagal mengambil data stok minimum.");
        }
      }
    };

    fetchMinimumStok();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full overflow-hidden">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-sm sm:text-2xl font-semibold text-gray-800">
          Stok Menipis
        </h2>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[500px] w-full border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="px-3 py-2">No</th>
              <th className="px-3 py-2">Nama</th>
              <th className="px-3 py-2">Kategori</th>
              <th className="px-3 py-2">Stok</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {produkMinimum.length === 0 ? (
              <tr className="border-t">
                <td
                  colSpan={4}
                  className="px-3 py-3 text-center text-gray-500 italic"
                >
                  Tidak ada produk dengan stok kurang dari 10 biji
                </td>
              </tr>
            ) : (
              produkMinimum.map((produk, i) => (
                <tr
                  key={produk.id}
                  className="border-t hover:bg-gray-100 transition-colors"
                >
                  <td className="px-3 py-2">{i + 1}</td>
                  <td className="px-3 py-2 capitalize">{produk.nama}</td>
                  <td className="px-3 py-2 capitalize">{produk.kategori}</td>
                  <td className="px-3 py-2">{produk.stok}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
      )}
    </div>
  );
};

export default StokRendah;
