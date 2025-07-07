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
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
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
    <div className="flex flex-col min-h-screen w-full bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow px-2 sm:px-6 py-2 sm:py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              backgroundColor: "#4D81F1",
              color: "white",
              padding: "6px",
              borderRadius: "6px",
              fontSize: "1.2rem",
            }}
            className="md:hidden"
          >
            <FaBars />
          </button>
          <img
            src="/logo.png"
            alt="Logo Toko Angkasa"
            className="h-8 sm:h-14 w-auto"
          />
        </div>

        {/* Role + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ backgroundColor: "#D5DAE0" }}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-xl text-xs sm:text-base"
          >
            <FaUserCircle className="text-base sm:text-xl text-black" />
            <span className="font-semibold text-black truncate max-w-[80px] sm:max-w-none">
              {role}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <button
                onClick={handleLogout}
                style={{ backgroundColor: "red" }}
                className="w-full text-center px-4 py-2 text-xs sm:text-sm text-white hover:bg-gray-100 rounded-md transition duration-150"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex w-64 fixed top-[68px] left-0 h-[calc(100vh-68px)] bg-white border-r shadow-sm flex-col py-4 px-3">
        <SidebarContent />
      </div>

      {/* Sidebar - Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[999] flex md:hidden">
          <div className="w-60 bg-white shadow-xl p-3 h-full overflow-y-auto relative z-[1000]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base text-[#4D81F1] font-bold">Menu</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white bg-[#4D81F1] p-2 rounded-md"
              >
                <FaTimes size={18} />
              </button>
            </div>
            <SidebarContent />
          </div>

          {/* Klik area luar untuk menutup */}
          <div
            className="flex-1  bg-opacity-30"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Content */}
      <main className="flex-1 md:ml-64 p-3 sm:p-4 overflow-x-auto">
        {children}
      </main>
    </div>
  );
};

const SidebarContent = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="space-y-4 text-base">
      <NavItem
        icon={<FaTachometerAlt />}
        label="Dashboard"
        to="/dashboard"
        active={path === "/dashboard"}
      />
      <NavItem
        icon={<FaCashRegister />}
        label="Kasir"
        to="/kasir"
        active={path === "/kasir"}
      />
      <NavItem
        icon={<FaBox />}
        label="Produk"
        to="/produk"
        active={path === "/produk"}
      />
      <NavItem
        icon={<FaHistory />}
        label="Histori"
        to="/histori"
        active={path === "/histori"}
      />
      <NavItem
        icon={<FaUsers />}
        label="Pelanggan"
        to="/pelanggan"
        active={path === "/pelanggan"}
      />
    </nav>
  );
};

// NavItem Component
type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
};

const NavItem = ({ icon, label, to, active = false }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm sm:text-base ${
        active ? "bg-[#4D81F1] text-white" : "text-black hover:bg-blue-100"
      }`}
    >
      <span
        className={`text-lg ${
          active ? "text-white" : "text-black group-hover:text-black"
        }`}
      >
        {icon}
      </span>
      <span
        className={`font-semibold truncate ${
          active ? "text-white" : "text-black group-hover:text-black"
        }`}
      >
        {label}
      </span>
    </Link>
  );
};

export default Sidebar;
