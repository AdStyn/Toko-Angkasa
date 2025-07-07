import React, { useState } from "react";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TambahProduk: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    harga: "",
    hargabeli: "",
    hargaGrosir: "",
    setpack: "",
    stok: "",
  });

  const [kategoriBaru, setKategoriBaru] = useState("");
  const [showInputKategoriBaru, setShowInputKategoriBaru] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        harga: parseFloat(formData.harga),
        hargabeli: parseFloat(formData.hargabeli),
        hargaGrosir: parseFloat(formData.hargaGrosir),
        stok: parseFloat(formData.stok),
        setpack: formData.setpack,
      };

      await axios.post(
        "https://grx6wqmr-3004.asse.devtunnels.ms/product/add_produk",
        payload
      );
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Gagal menambahkan produk:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-white text-black rounded-xl w-full max-w-lg p-6 shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Tambah Produk
        </h2>

        <div className="space-y-4">
          {/* Field Umum */}
          {[
            { label: "Nama Produk", name: "nama" },
            { label: "Harga Jual", name: "harga" },
            { label: "Harga Beli", name: "hargabeli" },
            { label: "Harga (Grosir)", name: "hargaGrosir" },
            { label: "Bijian / Pack", name: "setpack" },
            { label: "Jumlah Stok", name: "stok" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
              />
            </div>
          ))}

          {/* Kategori */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Kategori
            </label>
            {showInputKategoriBaru ? (
              <input
                type="text"
                name="kategori"
                placeholder="Kategori baru..."
                value={kategoriBaru}
                onChange={(e) => {
                  setKategoriBaru(e.target.value);
                  setFormData({ ...formData, kategori: e.target.value });
                }}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Pilih Kategori</option>
                <option value="pakan">Pakan</option>
                <option value="sembako">Sembako</option>
              </select>
            )}
            <button
              type="button"
              onClick={() => {
                setShowInputKategoriBaru(!showInputKategoriBaru);
                setKategoriBaru("");
              }}
              className="text-white mt-1 text-sm hover:underline text-left"
              style={{ backgroundColor: "#4D81F1" }}
            >
              {showInputKategoriBaru
                ? "Pilih dari daftar"
                : "+ Tambah kategori baru"}
            </button>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
            style={{ backgroundColor: "#FF4B4B" }}
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg  text-white hover:bg-blue-600 transition"
            style={{ backgroundColor: "#4D81F1" }}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahProduk;
