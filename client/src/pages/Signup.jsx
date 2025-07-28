import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    // Client-side validation
    if (!fullName || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    // API CONFIG
    axios
      .post("http://127.0.0.1:5000/api/signup", { email, password, fullName })
      .then((res) => {
        console.log("Signup successful:", res.data);
        if (res.data.success && res.data.message.includes("successful")) {
          setMessage(res.data.message);
          navigate("/login"); // Navigate to login on successful signup
        } else {
          setMessage(res.data.message || "Sign Up successful");
          navigate("/login");
        }

        // Clear form fields after successful submission
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        console.error("Sign-Up Error: ", err); // Use console.error for errors
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message); // Display error message from backend
        } else {
          setMessage("An error occurred during signup. Please try again."); // Generic error message
        }
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center md:p-8 sm:px-3 px-1 bg-trading-primary overflow-hidden">
      {/* Background blobs for visual effect */}
      <div className="absolute top-1/4 left-5 w-48 h-48 bg-yellow-500 rounded-full filter blur-xl opacity-20 animate-blob md:block hidden"></div>
      <div className="absolute bottom-1/4 right-16 w-48 h-48 bg-yellow-600 rounded-full filter blur-xl opacity-20 animate-blob animation-delay-2000 md:block hidden"></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400 rounded-full filter blur-xl opacity-20
      animate-blob animation-delay-4000 md:block hidden"
      ></div>

      {/* Main signup form container */}
      <div className="relative w-full max-w-md bg-trading-secondary border border-trading-tertiary rounded-xl p-6 overflow-hidden">
        <div className="pt-8">
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex space-x-3 items-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-trading-accent">
                {/* SVG for logo icon */}
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

          {/* Message display (success/error) */}
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

          {/* Signup Form */}
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div className="space-y-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Full Name
                </label>
              </div>
              <div>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="border border-trading-tertiary focus:border-accent transition-colors w-full px-4 py-3
                  rounded-lg text-foreground bg-trading-primary"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-trading-tertiary focus:border-accent transition-colors w-full px-4 py-3
                  rounded-lg text-foreground bg-trading-primary"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
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
            {/* Confirm Password Input */}
            <div className="space-y-2 relative">
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
              </div>
              <div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  className="border border-trading-tertiary focus:border-accent transition-colors w-full px-4 py-3
                  rounded-lg text-foreground bg-trading-primary"
                  placeholder="Confirm your password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div
                className="absolute text-xl text-accent right-6 top-9 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}{" "}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full font-semibold py-3 px-6 rounded-lg transition-colors bg-trading-accent text-trading-primary
                hover:bg-trading-accentDark"
              >
                Create Account
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-trading-accent hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
