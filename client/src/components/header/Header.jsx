import React from 'react'
import { BiBell } from 'react-icons/bi';
import { RiMenu3Line } from 'react-icons/ri';
import { Outlet } from 'react-router-dom';

export default function Header() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="flex items-center justify-between bg-trading-secondary border-b border-b-trading-tertiary w-full h-[97px] px-6">
        <div className="flex items-center gap-6">
          <div>
            <RiMenu3Line
              className="text-2xl cursor-pointer menu-toggle text-gray-300 hover:text-white lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            />
          </div>
          <h1 className="text-white md:text-2xl text-xl font-semibold">
            Trading Dashboard
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full border border-opacity-20 border-trading-success bg-[#10b9811a]">
            <div className="w-2 h-2 rounded-full animate-anime bg-trading-success"></div>
            <span className="text-xs font-medium text-trading-success">
              Market Open
            </span>
          </div>
          <div className="relative text-gray-300 hover:text-accent transition-colors cursor-pointer">
            <BiBell className="text-xl" />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border border-trading-secondary bg-trading-error"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-trading-primary">
        <Outlet />
      </main>
    </div>
  );
}
