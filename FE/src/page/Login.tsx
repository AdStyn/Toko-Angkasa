import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !password) {
      setError("Nama dan sandi wajib diisi.");
      return;
    }
    try {
      const response = await axios.post(
        "https://grx6wqmr-3004.asse.devtunnels.ms/users/login",
        { name, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response full:", response.data);

      const role = response.data.user?.role || response.data.role;
      const token = response.data.token;

      if (!role || !token) {
        setError("Peran atau token tidak ditemukan dalam respons.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      setError("");

      if (role === "SuperAdmin") {
        navigate("/dashboard");
      } else if (role === "Admin") {
        navigate("/dashboard");
      } else {
        alert("peran tidak dikenali");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Terjadi kesalahan saat login. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10 md:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#4D81F1] mb-6">
          Login
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
          </div>

          {/* Tombol Masuk */}
          <button
            type="submit"
            className="w-full text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Masuk
          </button>
        </form>

        {/* Link ke Register */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Belum punya akun?{""}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
