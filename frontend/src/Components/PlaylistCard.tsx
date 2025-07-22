import { FaMusic, FaHeart } from "react-icons/fa";

const PlayListCardUI = () => {
  return (
    <div className="flex items-center p-4 rounded-xl shadow-lg cursor-pointer hover:bg-white/10 transition-all duration-300 group glass">
      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
        <FaHeart className="text-white text-lg" />
      </div>
      <div className="ml-4 flex-1">
        <h2 className="font-semibold text-white group-hover:text-pink-400 transition-colors duration-300">My Playlist</h2>
        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
          Playlist • <span className="text-green-400">Liked Songs</span>
        </p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="music-bars">
          <div className="music-bar"></div>
          <div className="music-bar"></div>
          <div className="music-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default PlayListCardUI;
