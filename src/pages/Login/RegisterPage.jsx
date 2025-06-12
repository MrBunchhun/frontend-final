import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../util/request";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await request("auth/register", "post", form);

      if (res.message) {
        setMessage(res.message);
        // Redirect to login so user can login after verifying OTP
        setTimeout(() => {
          navigate("/login");
        }, 2000); // 2 seconds delay so user can read message
      } else {
        setError("Unexpected response from server. Please try again.");
      }
    } catch (err) {
      const errorMsg =
        err.error || err.message || "Registration failed. Please try again.";
      setError(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] flex items-center justify-center px-4">
      <div className="bg-[#1c1c1e] w-full max-w-sm p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full px-4 py-2 rounded bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded bg-[#2c2c2e] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-400 text-sm text-center">{message}</p>}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-red-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
