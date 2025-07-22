import React from "react";
import { FaPlay, FaBookmark, FaMusic } from "react-icons/fa";
import { useSongData } from "../context/SongContext";
import { useUserContext } from "../context/UserContext";

interface SongCardProps {
  image: string;
  name: string;
  desc: string;
  id: string;
}

const SongCard: React.FC<SongCardProps> = ({ image, name, desc, id }) => {
  const { setSelectedSong, setIsPlaying } = useSongData();
  const { addToPlaylist, user, isAuth } = useUserContext();

  function saveToPlaylist() {
    if (user) {
      addToPlaylist(id);
    }
  }

  return (
    <div className="w-[180px] p-3 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300 hover:scale-105 group glass shadow-lg">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={image ? image : "/music.jpeg"}
          className="w-full h-[160px] object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
          alt={name}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
        
        {/* Music icon overlay when no image */}
        {!image && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
            <FaMusic className="text-white text-4xl opacity-50" />
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            className="play-button bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg transform translate-y-2 group-hover:translate-y-0"
            onClick={() => {
              setSelectedSong(id);
              setIsPlaying(true);
            }}
          >
            <FaPlay size={14} />
          </button>

          {isAuth && (
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg transform translate-y-2 group-hover:translate-y-0"
              onClick={saveToPlaylist}
              style={{ transitionDelay: '50ms' }}
            >
              <FaBookmark size={14} />
            </button>
          )}
        </div>

        {/* Playing indicator */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="music-bars">
            <div className="music-bar"></div>
            <div className="music-bar"></div>
            <div className="music-bar"></div>
            <div className="music-bar"></div>
          </div>
        </div>
      </div>

      {/* Song info */}
      <div className="mt-4 space-y-1">
        <p className="font-bold text-white truncate group-hover:text-green-400 transition-colors duration-300">
          {name}
        </p>
        <p className="text-gray-300 text-sm truncate group-hover:text-gray-200 transition-colors duration-300">
          {desc.slice(0, 25)}...
        </p>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-green-500/30 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default SongCard;
