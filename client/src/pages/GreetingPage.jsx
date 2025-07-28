import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

export default function GreetingPage() {
  return (
    <section className="relative flex items-center justify-center min-h-screen flex-col px-4 overflow-hidden bg-slate-900">
      {/* Background Shapes */}
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-yellow-500 rounded-full filter blur-xl opacity-20 animate-blob md:block hidden"></div>
      <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-yellow-600 rounded-full filter blur-xl opacity-20 animate-blob animation-delay-2000 md:block hidden"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400 rounded-full filter blur-xl opacity-20 animate-blob animation-delay-4000 md:block hidden"></div>

      {/* Main Content */}
      <div
        className="relative z-10 text-center mb-16 md:mb-24 wow fadeInUp"
        data-wow-delay="1s"
      >
        {/* Adjusted delay for faster intro */}
        <span className="text-yellow-400 text-sm font-medium tracking-wider uppercase mb-2 block">
          Private Trading Platform
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-200 mb-4">
          Professional Trading Hub
        </h2>
        <p className="text-gray-300 text-lg md:text-xl font-light max-w-[573px] mx-auto leading-relaxed">
          Advanced Paper Trading Environment • Risk-Free Skill Development •
          Real-Time Market Analysis
        </p>
      </div>

      {/* 3D Cube (Existing) */}
      <div className="relative z-10 mx-auto mb-16">
        {/* Adjusted margin */}
        <div className="relative w-[75px] h-[75px] [transform-style:preserve-3d] [transform:rotateX(-30deg)] animate-cube-spin">
          <div className="absolute w-[75px] h-[75px] bg-trading-accentDark [transform:rotateX(90deg)_translateZ(37.5px)] [transform-style:preserve-3d]">
            <div className="content-[''] absolute w-[75px] h-[75px] bg-trading-accent [transform:translateZ(-90px)] blur-[10px] shadow-[0_0_10px_#323232,0_0_20px_theme(colors.trading-accent),0_0_30px_#323232,0_0_40px_theme(colors.trading-accent)]"></div>
          </div>

          <div className="absolute w-full h-full [transform-style:preserve-3d]">
            <span className="absolute w-full h-full [transform:rotateY(calc(90deg*0))_translateZ(37.5px)] bg-gradient-to-br from-trading-accentDark via-trading-accent/80 to-sidebar-accent"></span>
            <span className="absolute w-full h-full [transform:rotateY(calc(90deg*1))_translateZ(37.5px)] bg-gradient-to-bl from-trading-accentDark via-trading-accent/80 to-sidebar-accent"></span>
            <span className="absolute w-full h-full [transform:rotateY(calc(90deg*2))_translateZ(37.5px)] bg-gradient-to-tr from-trading-accentDark via-trading-accent/80 to-sidebar-accent"></span>
            <span className="absolute w-full h-full [transform:rotateY(calc(90deg*3))_translateZ(37.5px)] bg-gradient-to-tl from-trading-accentDark via-trading-accent/80 to-sidebar-accent"></span>
          </div>
        </div>
      </div>

      {/* Progress Bar (Existing) */}
      <div className="relative z-10 max-w-md mx-auto w-full">
        <div className="flex items-center justify-between w-full">
          <span className="text-sm text-gray-400 font-medium">
            Initializing Your Trading Environment
          </span>
          <span className="text-sm text-gray-400 font-medium">100%</span>
        </div>
        <div className="w-full h-2 bg-gray-500 rounded-full mt-1">
          <div className="w-full h-2 bg-gradient-to-l from-trading-accent to-trading-accentDark rounded-full animate-progress"></div>
        </div>
      </div>
      <Link
        to={"/signup"}
        className="relative z-10 max-w-md mx-auto w-full mt-6 wow fadeInUp"
        data-wow-delay="1.5s"
      >
        <button
          type="button"
          className="flex gap-6 items-center justify-center hover:scale-105 transition-all w-full text-center py-3 px-6 bg-gradient-to-r from-trading-accent
          to-trading-accentDark rounded-lg text-black font-semibold text-lg"
        >
          Continue <FaArrowRightLong />
        </button>
      </Link>
    </section>
  );
}
