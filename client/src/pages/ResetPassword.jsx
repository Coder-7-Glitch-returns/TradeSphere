import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const uid = localStorage.getItem("UID");
  const [isShowPassword, setIsShowPassword] = useState();
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Client-side validation
    if (!email || !newPassword || !confirmPassword) {
      setMessage("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    axios
      .put(`http://127.0.0.1:5000/api/reset-password/${uid}`, {
        email: email,
        new_password: newPassword,
      })
      .then((response) => {
        setMessage(response.data.message);

        if (response.data.success) {
          setEmail("");
          setNewPassword("");
          setConfirmPassword("");
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Password reset failed";
        setMessage(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center md:p-8 sm:px-3 px-1 bg-trading-primary overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-5 w-48 h-48 bg-yellow-500 rounded-full filter blur-xl opacity-20 animate-blob md:block hidden"></div>
      <div className="absolute bottom-1/4 right-16 w-48 h-48 bg-yellow-600 rounded-full filter blur-xl opacity-20 animate-blob animation-delay-2000 md:block hidden"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400 rounded-full filter blur-xl opacity-20 animate-blob animation-delay-4000 md:block hidden"></div>

      {/* Reset Password form */}
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
                message.includes("success") || message.includes("Success")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
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
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                New Password
              </label>
              <input
                type={isShowPassword ? "text" : "password"}
                id="newPassword"
                className="border border-trading-tertiary focus:border-accent transition-colors w-full px-4 py-3 rounded-lg text-foreground bg-trading-primary"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength="8"
              />
              <div
                className="absolute text-xl text-accent right-6 top-11"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Confirm Password
              </label>
              <input
                type={isShowConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="border border-trading-tertiary focus:border-accent transition-colors w-full px-4 py-3 rounded-lg text-foreground bg-trading-primary"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="8"
              />
              <div
                className="absolute text-xl text-accent right-6 top-11"
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              >
                {isShowConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-trading-accent text-trading-primary hover:bg-trading-accentDark"
              }`}
            >
              {isLoading ? "Processing..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-4 text-center">
            Remember your password?
            <Link
              to="/login"
              className="text-gray-400 hover:text-trading-accent transition-colors"
            >
              {" "}
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
