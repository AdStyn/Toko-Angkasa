import React from "react";

interface KategoriDaftarProdukProps {
  kategoriList: string[];
  kategoriAktif: string;
  setKategoriAktif: (val: string) => void;
  produkFiltered: any[];
  tambahProduk: (item: any) => void;
}

const KategoriDaftarProduk: React.FC<KategoriDaftarProdukProps> = ({
  kategoriList,
  kategoriAktif,
  setKategoriAktif,
  produkFiltered,
  tambahProduk,
}) => {
  return (
    <>
      {/* Kategori */}
      <div className="mb-6">
        <div className="flex flex-col items-center">
          <h2 className="font-semibold text-lg mb-3">Kategori</h2>
          <div className="flex gap-2 flex-wrap justify-center">
            {kategoriList.map((kat) => (
              <button
                key={kat}
                onClick={() => setKategoriAktif(kat)}
                style={{
                  backgroundColor:
                    kategoriAktif === kat ? "#4D81F1" : "#E5E7EB",
                  color: kategoriAktif === kat ? "#ffffff" : "#374151",
                }}
                className="px-4 py-1.5 rounded-full text-sm transition font-medium hover:brightness-105"
              >
                {kat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Daftar Produk */}
      <div className="overflow-y-auto max-h-[60vh]">
        <table className="w-full text-sm border-t border-gray-300 bg-white shadow rounded-xl">
          <thead className="bg-[#F3F4F6] text-[#374151]">
            <tr className="text-left border-b border-gray-300">
              <th className="py-3 px-3">No</th>
              <th className="px-3">Nama</th>
              <th className="px-3">Stok</th>
              <th className="px-3">Harga</th>
            </tr>
          </thead>
          <tbody>
            {produkFiltered.map((item, idx) => (
              <tr
                key={idx}
                onClick={() => tambahProduk(item)}
                className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-2 px-3">{idx + 1}</td>
                <td className="px-3">{item.nama}</td>
                <td className="px-3">{item.stok}</td>
                <td className="px-3 relative">
                  <div className="group inline-block">
                    <button
                      className="text-sm text-black font-semibold px-3 py-1 rounded-lg hover:bg-gray-100 transition"
                      style={{ background: "transparent" }}
                    >
                      Rp {item.harga.toLocaleString("id-ID")}
                    </button>
                    <div
                      className="hidden group-hover:block absolute z-10 border rounded shadow-md mt-1 p-2 text-xs w-44"
                      style={{
                        backgroundColor: "#ffffff",
                        color: "#374151",
                      }}
                    >
                      <p className="mb-1">
                        <span style={{ fontWeight: 600 }}>Harga Normal:</span>{" "}
                        Rp {item.harga.toLocaleString("id-ID")}
                      </p>
                      <p>
                        <span style={{ fontWeight: 600 }}>Harga Grosir:</span>{" "}
                        Rp {(item.hargaGrosir || "-").toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default KategoriDaftarProduk;
