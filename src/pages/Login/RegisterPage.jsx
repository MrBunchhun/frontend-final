import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://final-information-production.up.railway.app/api/auth/register",
        form
      );
      setMessage(res.data.message);
      // optionally auto-navigate to OTP verification page
      setTimeout(() => navigate("/verify-otp", { state: { email: form.email } }), 2000);
    } catch (err) {
      const errMsg =
        err?.response?.data?.error || err?.response?.data?.message || "Registration failed";
      setError(typeof errMsg === "object" ? Object.values(errMsg).flat().join(", ") : errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="space-y-4 bg-[#1c1c1e] p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Name"
          className="w-full p-2 rounded bg-[#2c2c2e] border border-gray-600 text-white"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Email"
          className="w-full p-2 rounded bg-[#2c2c2e] border border-gray-600 text-white"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Password"
          className="w-full p-2 rounded bg-[#2c2c2e] border border-gray-600 text-white"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-400 text-sm">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 bg-red-600 rounded hover:bg-red-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-sm text-gray-400 mt-2 text-center">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-red-500 hover:underline">
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
