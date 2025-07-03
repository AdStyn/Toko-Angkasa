import React from "react";

const StokRendah: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full overflow-hidden">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-sm sm:text-2xl font-semibold text-gray-800">
          Stok Menipis
        </h2>
      </div>

      {/* Table wrapper */}
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
            {["produk a", "produk b", "produk c", "produk d", "produk e"].map(
              (produk, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-100 transition-colors"
                >
                  <td className="px-3 py-2">{i + 1}</td>
                  <td className="px-3 py-2 capitalize">{produk}</td>
                  <td className="px-3 py-2 capitalize">
                    Kategori {String.fromCharCode(97 + i)}
                  </td>
                  <td className="px-3 py-2">3</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StokRendah;
