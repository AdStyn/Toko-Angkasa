import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaTachometerAlt,
  FaCashRegister,
  FaBox,
  FaHistory,
  FaUsers,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SidebarLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

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
      } catch {
        setRole("Gagal mengambil role");
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ backgroundColor: "white" }}
            className="text-2xl md:hidden text-[#4D81F1] shadow-sm border-[#4D81F1] hover:bg-blue-800"
          >
            <FaBars />
          </button>
          <img
            src="/logo.png"
            alt="Logo Toko Angkasa"
            className="h-10 sm:h-14 w-auto"
          />
        </div>

        {/* Role + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ backgroundColor: "#D5DAE0" }}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-xl text-sm sm:text-base"
          >
            <FaUserCircle className="text-xl text-black" />
            <span className="font-semibold text-black">{role}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <button
                onClick={handleLogout}
                style={{ backgroundColor: "red" }}
                className="w-full text-center px-4 py-2 text-sm text-white hover:bg-gray-100 rounded-md transition duration-150"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex w-72 fixed top-[80px] left-0 h-[calc(100vh-80px)] bg-white border-r shadow-sm flex-col py-6 px-4">
        <SidebarContent />
      </div>

      {/* Sidebar - Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[999] flex md:hidden">
          <div className="w-64 bg-white shadow-xl p-4 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-[#4D81F1] font-bold">Menu</span>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{ backgroundColor: "red" }}
                className="text-white rounded-full p-2 hover:bg-blue-800"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <SidebarContent />
          </div>

          <div
            className="flex-1 bg-opacity-40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Content */}
      <main className="flex-1 md:ml-72 p-4 sm:p-6">{children}</main>
    </div>
  );
};

const SidebarContent = () => (
  <nav className="space-y-4 text-base">
    <NavItem icon={<FaTachometerAlt />} label="Dashboard" active />
    <NavItem icon={<FaCashRegister />} label="Kasir" />
    <NavItem icon={<FaBox />} label="Produk" />
    <NavItem icon={<FaHistory />} label="Histori" />
    <NavItem icon={<FaUsers />} label="Pelanggan" />
  </nav>
);

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
      className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all ${
        active ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
};

export default SidebarLayout;
