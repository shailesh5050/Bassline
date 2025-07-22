import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaMusic } from "react-icons/fa";

interface AlbumCardProps {
  image: string;
  name: string;
  desc: string;
  id: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ image, name, desc, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/album/" + id)}
      className="album-card min-w-[200px] p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300 hover:scale-105 group glass shadow-lg"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={image} 
          className="w-full h-[180px] object-cover rounded-lg group-hover:scale-110 transition-transform duration-500" 
          alt={name} 
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
        
        {/* Music icon overlay when no image */}
        {!image && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg">
            <FaMusic className="text-white text-4xl opacity-50" />
          </div>
        )}

        {/* Play button */}
        <div className="absolute bottom-3 right-3">
          <button className="play-button bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg transform translate-y-2 group-hover:translate-y-0">
            <FaPlay size={14} />
          </button>
        </div>

        {/* Album indicator */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-white">
            Album
          </div>
        </div>
      </div>

      {/* Album info */}
      <div className="mt-4 space-y-1">
        <p className="font-bold text-white truncate group-hover:text-green-400 transition-colors duration-300">
          {name.slice(0, 15)}...
        </p>
        <p className="text-gray-300 text-sm truncate group-hover:text-gray-200 transition-colors duration-300">
          {desc.slice(0, 20)}...
        </p>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-green-500/30 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default AlbumCard;