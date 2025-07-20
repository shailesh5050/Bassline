import { useEffect, useState } from "react";
import { Layout } from "../Components/Layout";
import {useSongData } from "../context/SongContext";
import { useUserContext } from "../context/UserContext";
import { FaBookmark, FaPlay, FaMusic, FaHeart } from "react-icons/fa";


const PlayList = () => {
  const { songs, setIsPlaying, setSelectedSong, loading } = useSongData();
  const { user, addToPlaylist } = useUserContext();
  const [myPlayList, setMyPlayList] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (songs && user?.playlist) {
      const filteredSongs = songs.filter((song) =>
        user.playlist.includes(song.id.toString())
      );
      setMyPlayList(filteredSongs);
    }
  }, [songs, user]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <FaMusic className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-600 animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Layout>
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="px-4 py-8">
              {/* Header Section */}
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
                  <div className="flex gap-8 flex-col md:flex-row md:items-center">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <img 
                        src="/download.jpeg" 
                        className="relative w-48 h-48 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition duration-300" 
                        alt="Playlist cover" 
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                        <FaHeart className="text-white text-3xl animate-pulse" />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center gap-2">
                        <FaMusic className="text-purple-400" />
                        <span className="text-purple-300 font-medium uppercase tracking-wider text-sm">Playlist</span>
                      </div>
                      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {user?.name}'s Favorites
                      </h1>
                      <p className="text-gray-400 text-lg">Your handpicked collection of amazing tracks</p>
                      <div className="flex items-center gap-3 mt-4">
                        <img src="/logo.png" className="w-8 h-8 rounded-full" alt="Logo" />
                        <span className="text-gray-300">{myPlayList.length} songs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Songs List */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 px-6 py-4 border-b border-gray-700/50 text-gray-400 text-sm font-medium uppercase tracking-wider">
                  <div className="flex items-center gap-4">
                    <span>#</span>
                    <span>Title</span>
                  </div>
                  <div className="hidden sm:block">Description</div>
                  <div className="text-center">Duration</div>
                  <div className="text-center">Actions</div>
                </div>

                {/* Songs */}
                <div className="divide-y divide-gray-700/30">
                  {myPlayList.map((song, index) => (
                    <div
                      key={song.id}
                      className={`group grid grid-cols-3 sm:grid-cols-4 gap-4 px-6 py-4 hover:bg-gradient-to-r hover:from-purple-900/20 hover:to-pink-900/20 transition-all duration-300 cursor-pointer transform hover:scale-[1.01] ${
                        isVisible ? 'animate-fade-in-up' : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Song Info */}
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400 font-medium w-6 text-center group-hover:text-white transition-colors">
                          {index + 1}
                        </span>
                        <div className="relative">
                          <img
                            src={song.thumbnail || "/download.jpeg"}
                            className="w-12 h-12 rounded-lg object-cover shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300"
                            alt={song.title}
                          />
                          <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <FaPlay className="text-white text-sm" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-white font-medium truncate group-hover:text-purple-300 transition-colors">
                            {song.title}
                          </h3>
                          <p className="text-gray-400 text-sm truncate">
                            {song.artist || 'Unknown Artist'}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="hidden sm:flex items-center">
                        <p className="text-gray-400 text-sm truncate group-hover:text-gray-300 transition-colors">
                          {song.description?.slice(0, 40)}...
                        </p>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center justify-center">
                        <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                          {song.duration || '3:45'}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => addToPlaylist(song.id)}
                          className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
                          title="Add to favorites"
                        >
                          <FaHeart className="text-sm" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSong(song.id);
                            setIsPlaying(true);
                          }}
                          className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50"
                          title="Play song"
                        >
                          <FaPlay className="text-sm ml-0.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {myPlayList.length === 0 && (
                  <div className="text-center py-16">
                    <FaMusic className="text-6xl text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">Your playlist is empty</h3>
                    <p className="text-gray-500">Start adding your favorite songs to see them here!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default PlayList;