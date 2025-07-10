import React, { useState } from "react";

interface ProdukMixProps {
  produk: any[];
  onTambah: (produk: any) => void;
  onClose: () => void;
  kategori: string;
}

const ModalMix: React.FC<ProdukMixProps> = ({
  produk,
  onTambah,
  onClose,
  kategori,
}) => {
  const produkFiltered = produk.filter((p) => p.kategori === kategori);
  const [search, setSearch] = useState("");
  const [produkMix, setProdukMix] = useState(
    produkFiltered.map((item) => ({ ...item, pcs: 1 }))
  );

  const updatePcs = (index: number, value: number) => {
    const updated = [...produkMix];
    updated[index].pcs = value;
    setProdukMix(updated);
  };

  const filteredProduk = produkMix.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button
              className=" text-white px-3 py-1 rounded-full text-sm"
              style={{ backgroundColor: "#4D81F1" }}
            >
              Mixs
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-white px-3 py-1 rounded-full text-sm"
            >
              Biasa
            </button>
          </div>
        </div>

        <div className="flex items-center bg-gray-200 text-black rounded-full px-4 py-2 mb-4">
          <input
            type="text"
            placeholder="Cari produk..."
            className="bg-transparent outline-none w-full text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-2 max-h-[300px] text-black overflow-y-auto">
          {filteredProduk.map((item, idx) => (
            <div
              key={idx}
              className="border rounded-lg px-4 py-2 flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-semibold">{item.nama}</p>
                <div className="mt-1">
                  <label className="text-xs">Pcs = </label>
                  <input
                    type="number"
                    value={item.pcs}
                    onChange={(e) =>
                      updatePcs(idx, parseInt(e.target.value || "1"))
                    }
                    className="border text-sm px-2 py-0.5 rounded-md ml-2 w-16"
                  />
                </div>
              </div>
              <button
                className="text-2xl font-bold text-gray-700 hover:text-black"
                onClick={() => {
                  const selected = { ...item, tipe: "Mix" };
                  onTambah(selected);
                }}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalMix;
