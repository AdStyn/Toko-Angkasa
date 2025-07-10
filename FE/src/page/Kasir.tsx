import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import { FaSearch } from "react-icons/fa";
import ModalMix from "../Components/Mixs";
import Kalkulator from "../Components/Kalkulator";
import KategoriDaftarProduk from "../Components/KategoriDaftarProduk";

const Kasir: React.FC = () => {
  const [kategoriList, setKategoriList] = useState<string[]>([]);
  const [kategoriAktif, setKategoriAktif] = useState("");
  const [produk, setProduk] = useState<any[]>([]);
  const [produkDipilih, setProdukDipilih] = useState<any[]>([]);
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModalMix, setShowModalMix] = useState(false);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await axios.get(
          "https://grx6wqmr-3004.asse.devtunnels.ms/product/kategori"
        );
        const data = res.data.map((item: any) => item.nama);
        setKategoriList(data);
        if (data.length > 0) setKategoriAktif(data[0]);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };
    fetchKategori();
  }, []);

  useEffect(() => {
    if (!kategoriAktif) return;
    const fetchProduk = async () => {
      try {
        const res = await axios.get(
          "https://grx6wqmr-3004.asse.devtunnels.ms/product/show_product"
        );
        const filtered = res.data.filter(
          (item: any) => item.kategori === kategoriAktif
        );
        setProduk(filtered);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      }
    };
    fetchProduk();
  }, [kategoriAktif]);

  useEffect(() => {
    const mixItems = produkDipilih.filter((item) => item.tipe === "Mix");
    const normalItems = produkDipilih.filter((item) => item.tipe !== "Mix");

    const kategoriMixUnik = [...new Set(mixItems.map((item) => item.kategori))];
    const mixFee = kategoriMixUnik.length * 5000;

    const total = [...mixItems, ...normalItems].reduce(
      (acc, item) => acc + item.harga * item.pcs,
      0
    );
    setTotalHarga(total + mixFee);
  }, [produkDipilih]);

  useEffect(() => {
    const updatedProduk = produkDipilih.map((item) => {
      const hargaAsli = item.hargaAsli ?? item.harga;
      const hargaBaru =
        namaPelanggan && item.hargaGrosir ? item.hargaGrosir : hargaAsli;

      return {
        ...item,
        harga: hargaBaru,
        hargaAsli,
      };
    });

    setProdukDipilih(updatedProduk);
  }, [namaPelanggan]);

  const produkFiltered = produk.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tambahProduk = (item: any) => {
    if (item.tipe === "Mix") {
      setProdukDipilih((prev) => {
        const mixYangSama = prev.filter(
          (p) => p.kategori === item.kategori && p.tipe === "Mix"
        );
        const lainnya = prev.filter(
          (p) => !(p.kategori === item.kategori && p.tipe === "Mix")
        );
        return [...lainnya, ...mixYangSama, item];
      });
    } else {
      setProdukDipilih((prev) => {
        const sudahAda = prev.find((p) => p.nama === item.nama);
        if (sudahAda) return prev;
        return [
          ...prev,
          {
            ...item,
            harga:
              namaPelanggan && item.hargaGrosir ? item.hargaGrosir : item.harga,
            hargaAsli: item.harga,
            pcs: 1,
          },
        ];
      });
    }
  };

  const hapusProduk = (index: number) => {
    const updated = [...produkDipilih];
    updated.splice(index, 1);
    setProdukDipilih(updated);
  };

  const updatePcs = (index: number, value: number) => {
    const updated = [...produkDipilih];
    updated[index].pcs = value;
    setProdukDipilih(updated);
  };

  return (
    <Sidebar>
      <div className="w-full p-6 text-[#374151] bg-[#F9FAFB]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-black">Kasir</h1>
          <div className="w-full md:w-1/2 flex justify-end">
            <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 w-full sm:w-64">
              <FaSearch className="text-[#4D81F1] mr-2" />
              <input
                type="text"
                placeholder="Cari produk..."
                className="bg-transparent outline-none w-full text-gray-800 placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kategori dan Produk */}
          <div className="md:col-span-2">
            <KategoriDaftarProduk
              kategoriList={kategoriList}
              kategoriAktif={kategoriAktif}
              setKategoriAktif={setKategoriAktif}
              produkFiltered={produkFiltered}
              tambahProduk={tambahProduk}
            />
          </div>

          {/* Kalkulator */}
          <Kalkulator
            namaPelanggan={namaPelanggan}
            setNamaPelanggan={setNamaPelanggan}
            produkDipilih={produkDipilih}
            setProdukDipilih={setProdukDipilih}
            updatePcs={updatePcs}
            hapusProduk={hapusProduk}
            totalHarga={totalHarga}
            onOpenMix={() => setShowModalMix(true)}
          />
        </div>
      </div>

      {/* Modal Mix */}
      {showModalMix && (
        <ModalMix
          produk={produk}
          kategori={kategoriAktif}
          onTambah={(item) => {
            tambahProduk({ ...item, tipe: "Mix" });
            setShowModalMix(false);
          }}
          onClose={() => setShowModalMix(false)}
        />
      )}
    </Sidebar>
  );
};

export default Kasir;
