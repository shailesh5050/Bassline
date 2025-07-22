import React, { type ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Player from "./Player";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="h-[85%] flex gap-2 p-2">
        <Sidebar />
        <div className="flex-1 rounded-xl glass text-white shadow-2xl border border-white/10 flex flex-col overflow-hidden">
          <div className="px-6 pt-4 pb-2 flex-shrink-0">
            <Navbar />
          </div>
          <div className="flex-1 px-6 pb-4 overflow-y-auto">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </div>
      </div>
      <Player />
    </div>
  );
};
