import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../util/request";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", otp: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await request("auth/verify-otp", "post", form);
      setMessage(res.message);
      setTimeout(() => navigate("/login"), 2000); // redirect after success
    } catch (err) {
      setError(err?.error || "Verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131313] px-4">
      <div className="bg-[#1c1c1e] w-full max-w-sm p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="otp"
            value={form.otp}
            onChange={handleChange}
            placeholder="Enter 6-digit OTP"
            required
            className="w-full px-4 py-2 rounded bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm text-center">{message}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
