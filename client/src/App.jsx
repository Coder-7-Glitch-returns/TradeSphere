import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GreetingPage from "./pages/GreetingPage";
import Sidebar from "./components/Sidebar/Sidebar";
import Trading from "./pages/Trading";
import Portfolio from "./pages/Portfolio";
import Market from "./pages/Market";
import Settings from "./pages/Settings";
import { BiBell } from "react-icons/bi";
import { RiMenu3Line } from "react-icons/ri";
import ResetPassword from "./pages/ResetPassword";
import Header from "./components/header/header";

function App() {
  function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
      <>
      <div className="flex w-full min-h-screen bg-trading-primary text-white">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      <Header />
      </div>
      </>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <GreetingPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/main",
      element: <MainLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "trading",
          element: <Trading />,
        },
        {
          path: "portfolio",
          element: <Portfolio />,
        },
        {
          path: "market",
          element: <Market />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
