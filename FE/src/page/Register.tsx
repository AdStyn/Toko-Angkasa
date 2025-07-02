import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !password || !role) {
      setError("Nama, peran, dan sandi wajib diisi.");
      return;
    }

    try {
      const response = await axios.post(
        "https://grx6wqmr-3004.asse.devtunnels.ms/users/register",
        {
          name,
          password,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      navigate("/");
      setError("");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 md:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#4D81F1] mb-6">
          Daftar Akun
        </h1>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Nama */}
          <div>
            <label
              htmlFor="name"
              className="block font-semibold text-gray-700 mb-1"
            >
              Nama Lengkap
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
            />
          </div>

          {/* Dropdown Role */}
          <div>
            <label
              htmlFor="role"
              className="block font-semibold text-gray-700 mb-1"
            >
              Pilih Peran
            </label>
            <div className="relative">
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="" disabled>
                  -- Pilih peran Anda --
                </option>
                <option value="SuperAdmin">SuperAdmin</option>
                <option value="Admin">Admin</option>
              </select>
              {/* Icon panah ke bawah */}
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Menampilkan role yang dipilih */}
            {role && (
              <p className="mt-2 text-sm text-gray-600">
                Role yang dipilih:{" "}
                <span className="font-semibold text-cyan-600">{role}</span>
              </p>
            )}
          </div>

          {/* Input Sandi */}
          <div>
            <label
              htmlFor="password"
              className="block font-semibold text-gray-700 mb-1"
            >
              Kata Sandi
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
            />
          </div>

          {/* Tombol Daftar */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-[#4D81F1] transition"
          >
            Daftar
          </button>
        </form>

        {/* Link ke Login */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Sudah punya akun?{" "}
          <a href="/" className="text-cyan-600 hover:underline font-semibold">
            Masuk di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
