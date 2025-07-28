import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiTrendingUp } from "react-icons/bi";
import { FiBriefcase } from "react-icons/fi";
import { AiOutlineBarChart } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { loggedOutUser } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const uid = localStorage.getItem("UID");

  const [isEmail, setIsEmail] = useState("");
  const [isName, setIsName] = useState("");

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".menu-toggle")
      ) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, setIsSidebarOpen]);

  // Sidebar list
  const sidebarLinks = [
    {
      path: "/main/dashboard",
      text: "Dashboard",
      icon: <LuLayoutDashboard />,
    },
    {
      path: "/main/trading",
      text: "Trading",
      icon: <BiTrendingUp />,
    },
    {
      path: "/main/portfolio",
      text: "Portfolio",
      icon: <FiBriefcase />,
    },
    {
      path: "/main/market",
      text: "Market Data",
      icon: <AiOutlineBarChart />,
    },
    {
      path: "/main/settings",
      text: "Settings",
      icon: <IoSettingsOutline />,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    dispatch(loggedOutUser());
    navigate("/");
    setIsSidebarOpen(false);
  };

  // --- API Configuration ---
  async function getData() {
    axios
      .get(`http://127.0.0.1:5000/api/data/${uid}`)
      .then((res) => {
        console.log("API Response:", res.data);
        setIsEmail(res.data.user.email);
        setIsName(res.data.user.fullName);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }

  useEffect(() => {
    if (uid) {
      getData();
    } else {
      console.warn("UID not found in localStorage. Cannot fetch user data.");
    }
  }, [uid]);

  return (
    <>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 z-40 lg:hidden" />
      )}

      <div
        ref={sidebarRef}
        className={`fixed lg:static sm:w-72 w-full flex flex-col transition-all duration-300 z-50 bg-trading-secondary border border-trading-tertiary h-screen ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 lg:hidden">
          <FaTimes
            className="ml-auto cursor-pointer text-gray-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center mb-8 border-b border-b-trading-tertiary lg:pt-6 pt-0 px-6 pb-6">
          <div className="flex space-x-3 items-center">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-trading-accent">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M3 3h18v18H3z" fill="#0f0f0f" />
                <path d="M6 6h12v2H6zm0 4h12v2H6zm0 4h9v2H6z" fill="#ffea00" />
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

        {/* Sidebar List */}
        <ul className="px-4 space-y-3 flex-1">
          {sidebarLinks.map((data, i) => (
            <li
              key={i}
              className={`rounded-lg transition-colors ${
                isActive(data.path)
                  ? "bg-trading-accent border border-trading-accent"
                  : "bg-transparent border-transparent hover:bg-trading-tertiary"
              }`}
            >
              <Link
                to={data.path}
                className={`flex items-center space-x-3 px-4 py-3 font-medium transition-colors ${
                  isActive(data.path)
                    ? "text-black"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div className="text-lg">{data.icon}</div>
                <h1>{data.text}</h1>
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile */}
        <div className="mt-auto p-4 border-t border-t-trading-tertiary w-full">
          <div className="flex items-center space-x-3 w-full">
            <div className="sm:w-14 sm:h-10 w-14 h-12 rounded-full flex items-center justify-center bg-[#FFD70033]">
              <span className="font-medium text-trading-accent">
                {isName ? isName.charAt(0) : user.fullName?.charAt(0) || ""}
              </span>
            </div>
            <div className="min-w-0 w-full">
              <p className="text-sm font-medium text-white truncate">
                {isName || user.fullName || "Loading Name..."}
              </p>
              <p className="text-sm text-gray-400 truncate">
                {isEmail || user.email || "Loading Email..."}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-accent transition-colors text-xl mr-auto"
            >
              <MdLogout />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
