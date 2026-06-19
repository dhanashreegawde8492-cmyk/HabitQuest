import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getOwnedRewards as getUnlockedRewards } from "../utils/storage";
import { auth } from "../firebase";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem("userName", username);
      localStorage.setItem("isLoggedIn", "true");

      alert("Account Created Successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center">
      <div className="w-[400px] bg-slate-900/80 backdrop-blur-lg border border-purple-500/20 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-5xl font-bold text-center text-white">
          HabitQuest
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-8">
          Create Your Account
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none mb-4"
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none mb-4"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-400"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-4 text-gray-400"
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-purple-600 hover:bg-purple-700 mt-6 p-4 rounded-xl text-white font-semibold transition"
        >
          Create Account
        </button>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}