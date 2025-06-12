import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileStore } from "../../store/profileStore";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { funLogin } = profileStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://final-information-production.up.railway.app/api/auth/login",
        form
      );
      const { user, token } = res.data;
      funLogin(user, token);
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.error || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="space-y-4 bg-[#1c1c1e] p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 bg-red-600 rounded hover:bg-red-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-gray-400 mt-2 text-center">
          Don’t have an account?{" "}
          <button onClick={() => navigate("/register")} className="text-red-500 hover:underline">
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
