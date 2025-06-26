import { use, useEffect, useRef, useState } from "react";
import { useSongData } from "../context/SongContext";
import { FaPlay, FaPause } from "react-icons/fa";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
const Player = () => {
  const { song, isPlaying, nextSong, prevSong, setIsPlaying, fetchSingleSong } =
    useSongData();
  useEffect(() => {
    fetchSingleSong();
  }, [fetchSingleSong]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [volume, setVolume] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handelLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime || 0);
    };
    audio.addEventListener("loadedmetadata", handelLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
  }, [song]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value); 
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 10;
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    setProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div>
      {song && (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
          <div className="flex items-center gap-4">
            <img
              src={song.thumbnail ? song.thumbnail : "/music.jpeg"}
              alt={song.title}
              className="w-16 h-16 rounded"
            />
            <div className="hidden md:block">
              <p className="font-bold">{song.title}</p>
              <p className="text-sm text-gray-400">{song.artist}</p>
              <p className="text-sm text-gray-400">{song.description}</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 m-auto">
            {song.audio && (
              <audio
                ref={audioRef}
                src={song.audio}
                autoPlay={isPlaying}
                onEnded={nextSong}
                className="w-full"
              />
            )}
            <div className="w-full items-center flex font-light text-green-500">
              <input
                min={0}
                max={100}
                type="range"
                value={(progress / duration) * 100 || 0}
                onChange={handleProgressChange}
                className="progress-bar w-[120px] md:w-[300px] "
              />
            </div>
            <div className="flex justify-center items-center gap-4">
              <span className="cursor-pointer" onClick={prevSong}>
                <GrChapterPrevious />
              </span>

              <button
                className="bg-white text-black rounded-full p-2"
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <span className="cursor-pointer" onClick={nextSong}>
                <GrChapterNext />
              </span>
            </div>
          </div>

            <div className="flex items-center">
            <input
              type="range"
              className="w-16 md:w-32"
              min={"0"}
              max={"10"}
              step={"1"}
              value={volume}
              onChange={volumeChange}
            />
          </div>

        </div>
      )}
    </div>
  );
};

export default Player;
