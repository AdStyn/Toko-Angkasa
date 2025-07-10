import React from "react";
import { FaTrash } from "react-icons/fa";

interface KalkulatorProps {
  namaPelanggan: string;
  produkDipilih: any[];
  totalHarga: number;
  setNamaPelanggan: (val: string) => void;
  setProdukDipilih: (val: any[]) => void;
  updatePcs: (index: number, val: number) => void;
  hapusProduk: (index: number) => void;
  onOpenMix: () => void;
}

const Kalkulator: React.FC<KalkulatorProps> = ({
  namaPelanggan,
  produkDipilih,
  totalHarga,
  setNamaPelanggan,
  setProdukDipilih,
  updatePcs,
  hapusProduk,
  onOpenMix,
}) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl border w-full">
      <h3 className="text-xl font-bold text-black mb-4 text-center">
        Kalkulator
      </h3>

      {/* Input Nama Pelanggan */}
      <div className="mb-4 w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Pelanggan:
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          placeholder="Masukkan nama pelanggan"
          value={namaPelanggan}
          onChange={(e) => setNamaPelanggan(e.target.value)}
        />
      </div>

      <hr className="my-3" />

      <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
        {/* Produk Biasa */}
        {produkDipilih
          .filter((item) => item.tipe !== "Mix")
          .map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#F9FAFB] relative rounded-lg border"
            >
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <p className="font-bold text-sm flex items-center">
                    {item.nama}
                    <button
                      onClick={onOpenMix}
                      className="text-white text-xs px-2 py-0.5 rounded-full ml-2 bg-gray-500"
                    >
                      Biasa
                    </button>
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">
                    Rp {item.harga.toLocaleString("id-ID")}
                  </p>
                </div>
                <button
                  onClick={() => hapusProduk(idx)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <label>Pcs:</label>
                <input
                  type="number"
                  value={item.pcs}
                  min={1}
                  onChange={(e) =>
                    updatePcs(idx, parseInt(e.target.value || "1"))
                  }
                  className="border px-2 py-0.5 rounded-md w-20"
                />
              </div>
            </div>
          ))}

        {/* Produk Mix */}
        {(() => {
          const mixProduk = produkDipilih.filter((item) => item.tipe === "Mix");
          if (mixProduk.length === 0) return null;

          const namaGabung = mixProduk.map((p) => p.nama).join(" + ");
          const totalPcs = mixProduk.reduce((acc, p) => acc + p.pcs, 0);
          const totalHarga = mixProduk.reduce(
            (acc, p) => acc + p.harga * p.pcs,
            0
          );

          return (
            <div className="p-3 bg-[#F9FAFB] relative rounded-lg border">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <p className="font-bold text-sm flex items-center">
                    {namaGabung}
                    <span className="text-white text-xs px-2 py-0.5 rounded-full ml-2 bg-blue-500">
                      Mix
                    </span>
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">
                    Rp {totalHarga.toLocaleString("id-ID")}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setProdukDipilih(
                      produkDipilih.filter((item) => item.tipe !== "Mix")
                    )
                  }
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
              <p className="text-xs mt-1">Total pcs = {totalPcs}</p>
            </div>
          );
        })()}
      </div>

      <hr className="my-4" />

      {/* Ringkasan Harga */}
      {(namaPelanggan || produkDipilih.some((item) => item.tipe === "Mix")) && (
        <div className="text-sm text-black space-y-1">
          {produkDipilih.some((item) => item.tipe === "Mix") && (
            <p>
              <span className="font-semibold">Mixs</span> ×{" "}
              {produkDipilih.filter((item) => item.tipe === "Mix").length}: Rp{" "}
              {produkDipilih
                .filter((item) => item.tipe === "Mix")
                .reduce((acc, item) => acc + item.harga * item.pcs, 0)
                .toLocaleString("id-ID")}
            </p>
          )}
          {namaPelanggan && (
            <p>
              Harga Grosir: Rp{" "}
              {produkDipilih
                .reduce(
                  (acc, item) =>
                    acc + (item.hargaGrosir || item.harga) * item.pcs,
                  0
                )
                .toLocaleString("id-ID")}
            </p>
          )}
        </div>
      )}

      <div className="mt-4 flex justify-between text-lg font-bold text-black">
        <span>Total Harga</span>
        <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
      </div>

      <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-xl transition">
        Beli
      </button>
    </div>
  );
};

export default Kalkulator;
