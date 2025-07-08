import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaPlus, FaPen } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import ModalTambahProduk from "../Components/AddProduk";
import ModalUpdateProduk from "../Components/UpdateProduk";

type Produk = {
  id: number;
  nama: string;
  kategori: string;
  stokAsPack: string;
  harga: number | null;
};

const Produk: React.FC = () => {
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [filteredList, setFilteredList] = useState<Produk[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedProduk, setSelectedProduk] = useState<Produk | null>(null);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState<string>("");

  const fetchProduk = async () => {
    try {
      const res = await axios.get(
        "https://grx6wqmr-3004.asse.devtunnels.ms/product/show_product"
      );

      setProdukList(res.data);
      setFilteredList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
    }
  };

  useEffect(() => {
    fetchProduk();
    const userRole = localStorage.getItem("role");
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  useEffect(() => {
    const extractStok = (stokStr: string): number => {
      const match = stokStr.match(/(\d+)\s*pack(?:\s*\+\s*(\d+)\s*pcs)?/);
      if (!match) return 0;
      const pack = parseInt(match[1]) || 0;
      const pcs = parseInt(match[2]) || 0;
      return pack * 1_000 + pcs;
    };

    const lower = searchQuery.toLowerCase();
    const hasil = produkList.filter((item) =>
      item.nama.toLowerCase().includes(lower)
    );

    let sorted = [...hasil];
    switch (filter) {
      case "harga_terendah":
        sorted.sort((a, b) => (a.harga ?? 0) - (b.harga ?? 0));
        break;
      case "harga_tertinggi":
        sorted.sort((a, b) => (b.harga ?? 0) - (a.harga ?? 0));
        break;
      case "stok_terendah":
        sorted.sort(
          (a, b) => extractStok(a.stokAsPack) - extractStok(b.stokAsPack)
        );
        break;
      case "stok_tertinggi":
        sorted.sort(
          (a, b) => extractStok(b.stokAsPack) - extractStok(a.stokAsPack)
        );
        break;
    }

    setFilteredList(sorted);
  }, [searchQuery, filter, produkList]);

  return (
    <Sidebar>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 text-left sm:text-start">
          Produk
        </h1>
      </div>

      <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-2">
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:items-center sm:w-auto">
          <div className="flex items-center bg-gray-200 rounded-full px-3 py-2 w-full sm:w-64">
            <FaSearch className="text-[#4D81F1] mr-2" />
            <input
              type="text"
              placeholder="Cari produk..."
              className="bg-transparent outline-none w-full text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative w-full sm:w-10 h-10 sm:h-10">
            <img
              src="/filter.svg"
              alt="filter"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain absolute left-1 top-1 z-0"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="absolute top-0 left-0 w-full h-full opacity-0 z-10 cursor-pointer text-black"
            >
              <option value="">Normal</option>
              <option value="harga_terendah">Harga Terendah</option>
              <option value="harga_tertinggi">Harga Tertinggi</option>
              <option value="stok_terendah">Stok Terendah</option>
              <option value="stok_tertinggi">Stok Tertinggi</option>
            </select>
          </div>
        </div>

        {role === "SuperAdmin" && (
          <div className="w-full sm:w-auto flex justify-end">
            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-full shadow flex items-center gap-2"
              style={{ backgroundColor: "#4D81F1", color: "white" }}
            >
              <FaPlus /> Tambah Produk
            </button>
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left text-lg">
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Stok</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3 text-center"></th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filteredList.length > 0 ? (
              filteredList.map((produk, i) => (
                <tr
                  key={produk.id}
                  className="border-t hover:bg-gray-100 transition-all"
                >
                  <td className="px-4 py-3">{i + 1}.</td>
                  <td className="px-4 py-3 capitalize">{produk.nama}</td>
                  <td className="px-4 py-3 capitalize">{produk.kategori}</td>
                  <td className="px-4 py-3">{produk.stokAsPack ?? "-"}</td>

                  <td className="px-4 py-3">
                    {typeof produk.harga === "number"
                      ? produk.harga.toLocaleString("id-ID")
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {role === "SuperAdmin" && (
                      <button
                        onClick={() => {
                          setSelectedProduk(produk);
                          setModalEditOpen(true);
                        }}
                        className="text-[#4D81F1] p-2 rounded-full transition border-transparent"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <FaPen />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Tidak ada data produk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ModalTambahProduk
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setModalOpen(false);
          fetchProduk();
        }}
      />

      {selectedProduk && (
        <ModalUpdateProduk
          isOpen={modalEditOpen}
          onClose={() => setModalEditOpen(false)}
          onSuccess={() => {
            setModalEditOpen(false);
            fetchProduk();
          }}
          initialData={{
            id: selectedProduk.id,
            nama: selectedProduk.nama,
            harga: selectedProduk.harga?.toString() ?? "0",
            hargabeli: "0",
            kategori: selectedProduk.kategori,
            stok: selectedProduk.stokAsPack ?? "0",
            stokbaru: "",
            setpack: "",
            hargaGrosir: "0",
          }}
        />
      )}
    </Sidebar>
  );
};

export default Produk;
