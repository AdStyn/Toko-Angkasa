import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaTachometerAlt,
  FaCashRegister,
  FaBox,
  FaHistory,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";

const SidebarLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setRole("Tidak ada token");
          return;
        }

        const response = await axios.get(
          "https://grx6wqmr-3004.asse.devtunnels.ms/users/data_user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRole(response.data.data_user.role);
      } catch (error) {
        setRole("Gagal mengambil role");
      }
    };

    fetchUserRole();
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-white border-r shadow-lg">
        {/* Logo */}
        <div className="px-6 py-8 border-b flex justify-center items-center">
          <img
            src="/logo.png"
            alt="Logo Toko Angkasa"
            className="h-20 w-auto sm:h-24"
          />
        </div>

        {/* Menu */}
        <nav className="flex-1 p-6 space-y-4 text-lg">
          <NavItem icon={<FaTachometerAlt />} label="Dashboard" active />
          <NavItem icon={<FaCashRegister />} label="Kasir" />
          <NavItem icon={<FaBox />} label="Produk" />
          <NavItem icon={<FaHistory />} label="Histori" />
          <NavItem icon={<FaUsers />} label="Pelanggan" />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white shadow px-6 py-5 flex justify-end items-center border-b">
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl text-base">
            <FaUserCircle className="text-xl text-gray-700" />
            <span className="font-semibold text-xl text-gray-800">{role}</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 sm:p-8 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-4 px-5 py-4 rounded-lg cursor-pointer transition-all ${
        active ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-semibold text-lg">{label}</span>
    </div>
  );
};

export default SidebarLayout;
