import { useEffect, useState } from "react";
import { useSongData } from "../context/SongContext";
import { FaPlay, FaPause, FaVolumeUp, FaHeart, FaRandom, FaRedo } from "react-icons/fa";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";

const Player = () => {
  const { 
    song, 
    isPlaying, 
    nextSong, 
    prevSong, 
    fetchSingleSong,
    currentTime,
    duration,
    handlePlayPause: contextHandlePlayPause,
    handleVolumeChange: contextHandleVolumeChange,
    handleProgressChange: contextHandleProgressChange
  } = useSongData();
  
  useEffect(() => {
    fetchSingleSong();
  }, [fetchSingleSong]);

  const [volume, setVolume] = useState<number>(10);
  const [progress, setProgress] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Sync local state with context state
  useEffect(() => {
    setProgress(currentTime);
  }, [currentTime]);

  // Use the context's handlePlayPause function
  const handlePlayPause = () => {
    contextHandlePlayPause();
  };

  const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value); 
    setVolume(newVolume);
    contextHandleVolumeChange(newVolume);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    setProgress(newTime);
    contextHandleProgressChange(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-[15%] flex items-center">
      {song && (
        <div className="w-full glass border-t border-white/10 flex items-center text-white px-6 py-4 backdrop-blur-xl">
          {/* Song Info */}
          <div className="flex items-center gap-4 w-1/3 min-w-0">
            <div className="relative group flex-shrink-0">
              <img
                src={song.thumbnail ? song.thumbnail : "/music.jpeg"}
                alt={song.title}
                className="w-16 h-16 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="hidden md:block min-w-0 flex-1">
              <p className="font-bold text-white truncate hover:text-green-400 transition-colors duration-300">{song.title}</p>
              <p className="text-sm text-gray-300 truncate">{song.artist}</p>
              <p className="text-xs text-gray-400 truncate">{song.description}</p>
            </div>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`hidden md:block p-2 rounded-full transition-all duration-300 hover:scale-110 flex-shrink-0 ${
                isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <FaHeart />
            </button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center gap-3 flex-1 max-w-2xl">
            {/* Audio element is now managed by SongContext */}
            
            {/* Control Buttons */}
            <div className="flex justify-center items-center gap-6">
              <button className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110">
                <FaRandom size={16} />
              </button>
              
              <button 
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 p-2"
                onClick={prevSong}
              >
                <GrChapterPrevious size={20} />
              </button>

              <button
                className="play-button bg-gradient-to-r from-green-500 to-emerald-600 text-black rounded-full p-4 hover:from-green-400 hover:to-emerald-500 transition-all duration-300 hover:scale-110 shadow-lg"
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
              </button>

              <button 
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 p-2"
                onClick={nextSong}
              >
                <GrChapterNext size={20} />
              </button>

              <button className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110">
                <FaRedo size={16} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full flex items-center gap-3">
              <span className="text-xs text-gray-400 min-w-[35px] text-right">
                {formatTime(progress)}
              </span>
              <div className="flex-1 relative">
                <input
                  min={0}
                  max={100}
                  type="range"
                  value={(progress / duration) * 100 || 0}
                  onChange={handleProgressChange}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${(progress / duration) * 100}%, #4b5563 ${(progress / duration) * 100}%, #4b5563 100%)`
                  }}
                />
              </div>
              <span className="text-xs text-gray-400 min-w-[35px]">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-end gap-3 w-1/3">
            <FaVolumeUp className="text-gray-400" />
            <div className="relative w-24">
              <input
                type="range"
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                min="0"
                max="10"
                step="1"
                value={volume}
                onChange={volumeChange}
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${(volume / 10) * 100}%, #4b5563 ${(volume / 10) * 100}%, #4b5563 100%)`
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
