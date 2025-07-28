import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    axios
      .post("http://127.0.0.1:5000/api/login", { email, password })
      .then((res) => {
        dispatch(
          setUser({
            email: res.data.email,
            password: res.data.password,
          })
        );

        setMessage(res.data.message || "Sign In successful");
        navigate("/main/dashboard");
        setEmail("");
        setPassword("");
        localStorage.setItem("UID", res.data.user_id);
        console.log(res.data.user_id);
      })
      .catch((err) => {
        console.error("Login Error: ", err);
        setMessage(
          err.response?.data?.message ||
            "An error occurred during login. Please try again."
        );
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center md:p-8 sm:px-3 px-1 bg-trading-primary overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-5 w-48 h-48 bg-yellow-500 rounded-full filter blur-xl opacity-20 animate-blob md:block hidden"></div>
      <div className="absolute bottom-1/4 right-16 w-48 h-48 bg-yellow-600 rounded-full filter blur-xl opacity-20 animate-blob animation-delay-2000 md:block hidden"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400 rounded-full filter blur-xl opacity-20 animate-blob animation-delay-4000 md:block hidden"></div>

      {/* Login form */}
      <div className="relative w-full max-w-md bg-trading-secondary border border-trading-tertiary rounded-xl sm:p-6 p-3 overflow-hidden">
        <div className="pt-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex space-x-3 items-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-trading-accent">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3h18v18H3z" fill="#0f0f0f" />
                  <path
                    d="M6 6h12v2H6zm0 4h12v2H6zm0 4h9v2H6z"
                    fill="#ffea00"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-trading-accent">
                  TradeSphere
                </h1>
                <p className="text-xs text-gray-400">Pro</p>
              </div>
            </div>
          </div>

          {/* Message alert */}
          {message && (
            <div
              className={`p-3 mb-6 rounded-lg text-sm text-center ${
                message.includes("successful")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-trading-tertiary focus:border-accent transition-colors w-full px-4 py-3 rounded-lg text-foreground bg-trading-primary"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="border border-trading-tertiary focus:border-accent transition-colors w-full px-4 py-3 rounded-lg text-foreground bg-trading-primary"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute text-xl text-accent right-6 top-11 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
            <div className="text-end">
              <Link to={"/reset-password"} className="hover:text-accent">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full font-semibold py-3 px-6 rounded-lg transition-colors bg-trading-accent text-trading-primary hover:bg-trading-accentDark"
            >
              Sign In
            </button>
            <div className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-trading-accent hover:underline"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
