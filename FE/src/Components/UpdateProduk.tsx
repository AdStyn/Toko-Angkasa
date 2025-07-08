import React, { useState, useEffect } from "react";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData: {
    id: number;
    nama: string;
    harga: string;
    hargabeli?: string;
    kategori: string;
    stok: string;
    stokbaru?: string;
    setpack: string;
    hargaGrosir: string;
  };
}

const UpdateProduk: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [kategoriList, setKategoriList] = useState<string[]>([]);
  const [showInputKategoriBaru, setShowInputKategoriBaru] = useState(false);
  const [kategoriBaru, setKategoriBaru] = useState("");

  useEffect(() => {
    setFormData(initialData);
    if (isOpen) fetchKategori();
  }, [initialData, isOpen]);

  const fetchKategori = async () => {
    try {
      const res = await axios.get(
        "https://grx6wqmr-3004.asse.devtunnels.ms/product/kategori"
      );
      const data = res.data.map((item: any) => item.nama);
      setKategoriList(data);
    } catch (error) {
      console.error("Gagal mengambil kategori:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const finalKategori = showInputKategoriBaru
        ? kategoriBaru.trim()
        : formData.kategori;

      if (showInputKategoriBaru && finalKategori) {
        await axios.post(
          "https://grx6wqmr-3004.asse.devtunnels.ms/product/kategori/tambah",
          { nama: finalKategori }
        );
        await fetchKategori();
      }

      const payload = {
        nama: formData.nama,
        harga: parseFloat(formData.harga),
        hargabeli: parseFloat(formData.hargabeli || "0"),
        kategori: finalKategori,
        stok: parseFloat(formData.stok),
        stokbaru: parseFloat(formData.stokbaru || "0"),
        setpack: formData.setpack,
        hargaGrosir: parseFloat(formData.hargaGrosir),
      };

      await axios.post(
        `https://grx6wqmr-3004.asse.devtunnels.ms/product/update_produk/${initialData.id}`,
        payload
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Gagal mengupdate produk:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-white text-black rounded-xl w-full max-w-lg p-6 shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Update Produk
        </h2>

        <div className="space-y-4">
          {/* Input umum */}
          {[
            "nama",
            "harga",
            "hargabeli",
            "stok",
            "stokbaru",
            "setpack",
            "hargaGrosir",
          ].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field as keyof typeof formData] || ""}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          {/* Kategori dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Kategori
            </label>

            {showInputKategoriBaru ? (
              <input
                type="text"
                value={kategoriBaru}
                onChange={(e) => {
                  setKategoriBaru(e.target.value);
                  setFormData({ ...formData, kategori: e.target.value });
                }}
                placeholder="Kategori baru..."
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
                {kategoriList.map((kat, idx) => (
                  <option key={idx} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>
            )}

            <button
              type="button"
              onClick={() => {
                setShowInputKategoriBaru(!showInputKategoriBaru);
                setKategoriBaru("");
              }}
              className="text-white mt-1 text-sm hover:underline text-left"
              style={{ background: "#4D81F1" }}
            >
              {showInputKategoriBaru
                ? "Pilih dari daftar"
                : "+ Tambah kategori baru"}
            </button>
          </div>
        </div>

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
            className="px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition"
            style={{ backgroundColor: "#4D81F1" }}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduk;
