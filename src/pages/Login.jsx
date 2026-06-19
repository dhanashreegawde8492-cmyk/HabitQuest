import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem("userName", userCredential.user.email);
      localStorage.setItem("isLoggedIn", "true");

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.code);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("userName", user.displayName);
      localStorage.setItem("userPhoto", user.photoURL);
      localStorage.setItem("isLoggedIn", "true");

      alert(`Welcome ${user.displayName}`);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.code);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
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
          Level Up Your Life
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none mb-4"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-400 cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>

        <p
          onClick={handleForgotPassword}
          className="text-right text-sm text-purple-400 mt-2 cursor-pointer hover:text-purple-300"
        >
          Forgot Password?
        </p>

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 mt-6 p-4 rounded-xl text-white font-semibold transition"
        >
          Enter The Quest
        </button>

        <button
          onClick={googleLogin}
          className="w-full bg-white text-black mt-4 p-4 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Continue with Google
        </button>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:text-purple-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}