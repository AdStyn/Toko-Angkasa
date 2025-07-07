import React, { useState, useEffect } from "react";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData: {
    id: number;
    nama: string;
    kategori: string;
    harga: string;
    stok: string;
  };
}

const ModalUpdateProduk: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    harga: "",
    hargabeli: "",
    hargaGrosir: "",
    setpack: "",
    stok: "",
  });

  const [showKategoriBaru, setShowKategoriBaru] = useState(false);
  const [kategoriBaru, setKategoriBaru] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Validasi sederhana
      if (!formData.nama || !formData.kategori || !formData.harga) {
        alert("Nama, kategori, dan harga wajib diisi.");
        return;
      }

      const payload = {
        nama: formData.nama,
        kategori: formData.kategori,
        harga: parseFloat(formData.harga),
        hargabeli: parseFloat(formData.hargabeli),
        hargaGrosir: parseFloat(formData.hargaGrosir),
        stok: formData.stok ? parseFloat(formData.stok) : undefined,
        setpack: formData.setpack,
      };

      console.log("Mengirim payload update:", payload);

      const res = await axios.post(
        `https://grx6wqmr-3004.asse.devtunnels.ms/product/update_produk/${initialData.id}`,
        payload
      );

      if (res.status === 200) {
        console.log("Update berhasil:", res.data);
        onSuccess();
        onClose();
      } else {
        console.warn("Update tidak berhasil:", res);
        alert("Gagal update produk. Silakan coba lagi.");
      }
    } catch (error: any) {
      console.error("Gagal update produk:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-center items-center px-4">
      <div className="bg-white text-black rounded-xl p-6 w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Edit Produk
        </h2>

        <div className="space-y-4">
          {[
            { label: "Nama Produk", name: "nama" },
            { label: "Harga Jual", name: "harga" },
            { label: "Harga Beli", name: "hargabeli" },
            { label: "Harga Grosir", name: "hargaGrosir" },
            { label: "Setpack", name: "setpack" },
            { label: "Tambah Stok", name: "stok" },
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
            {showKategoriBaru ? (
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
                setShowKategoriBaru(!showKategoriBaru);
                setKategoriBaru("");
              }}
              className="mt-1 text-white text-sm hover:underline text-left"
              style={{ backgroundColor: "#4D81F1" }}
            >
              {showKategoriBaru
                ? "Pilih dari daftar"
                : "+ Tambah kategori baru"}
            </button>
          </div>
        </div>

        {/* Tombol aksi */}
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
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateProduk;
