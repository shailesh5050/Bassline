import { useNavigate } from "react-router-dom";
import PlaylistCard from "./PlaylistCard";
import { useUserContext } from "../context/UserContext";

const SidebarUI = () => {
  const navigate = useNavigate()
  const { user } = useUserContext()
  return (
    <div className="w-80 flex flex-col gap-2 text-white hidden lg:flex">
      {/* Top Section */}
      <div className="glass rounded-xl p-4 shadow-xl">
        <div className="space-y-2">
          <div onClick={()=>{navigate("/")}} className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg p-3 transition-all duration-300 group">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img src="/home.png" alt="Home" className="w-5 h-5" />
            </div>
            <p className="font-bold text-base group-hover:text-green-400 transition-colors duration-300">Home</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg p-3 transition-all duration-300 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img src="/search.png" alt="Search" className="w-5 h-5" />
            </div>
            <p className="font-bold text-base group-hover:text-purple-400 transition-colors duration-300">Search</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="glass rounded-xl shadow-xl flex-1 flex flex-col overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <img src="/stack.png" className="w-5 h-5" alt="Library" />
            </div>
            <p className="font-bold text-base">Your Library</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <img src="/arrow.png" className="w-4 h-4" alt="Arrow" />
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
              <img src="/plus.png" className="w-4 h-4" alt="Add" />
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800">
          {/* Playlist Card */}
          <div onClick={() => { navigate('/playlist') }} className="cursor-pointer">
            <PlaylistCard />
          </div>

          {/* Recently Played Section */}
          <div className="glass rounded-lg p-3 hover:bg-white/5 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <div className="music-bars">
                  <div className="music-bar"></div>
                  <div className="music-bar"></div>
                  <div className="music-bar"></div>
                  <div className="music-bar"></div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Recently Played</h3>
                <p className="text-gray-400 text-xs">Your recent tracks</p>
              </div>
            </div>
          </div>

          {/* Podcast Promo Card */}
          <div className="glass rounded-xl p-4 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20">
            <div className="mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <h1 className="font-bold text-sm mb-1 gradient-text">Let's find some podcasts to follow</h1>
              <p className="text-gray-300 text-xs">We'll keep you updated on new episodes</p>
            </div>
            <button className="w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg">
              Browse Podcasts
            </button>
          </div>

          {/* Admin Button */}
          {user?.role === "admin" && (
            <button
              onClick={() => { navigate('/admin') }}
              className="w-full px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-semibold rounded-full hover:from-amber-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
            >
              Admin Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarUI;
