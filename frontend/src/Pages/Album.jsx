import { FaBookmark, FaPlay } from "react-icons/fa";
import { Layout } from "../Components/Layout";
import { useSongData } from "../context/SongContext";
import { use, useEffect } from "react";
import { useParams } from "react-router-dom";
import {useUserContext} from '../context/UserContext'
const Album = () => {

    const { fetchAlbumSongs, setIsPlaying, selectedSong,setSelectedSong, albumData, albumSongs,loading } = useSongData();
    const {addToPlaylist} = useUserContext();
    const { id } = useParams();
    useEffect(() => {
       
        if (id) {
            fetchAlbumSongs(id);
            console.log(albumData)
        }

    }, [id]);    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <Layout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {!loading ? (
                    <>                        {/* Hero Section with Gradient Background */}
                        <div className="relative mt-6 mb-8">
                            {/* Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-purple-800/20 to-transparent rounded-2xl"></div>
                            
                            <div className="relative p-8 flex gap-8 flex-col md:flex-row md:items-end">
                                {/* Album Cover with Shadow */}
                                {albumData && albumData.thumbnail && (
                                    <div className="relative group">
                                        <img
                                            src={albumData.thumbnail}
                                            className="w-52 h-52 md:w-55 md:h-55 rounded-xl shadow-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                                            alt={albumData.title}
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                )}

                                {/* Album Info */}
                                <div className="flex flex-col justify-end flex-1">
                                    <div className="mb-2">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-600/20 text-purple-300 border border-purple-500/30">
                                            <FaPlay className="w-3 h-3 mr-1" />
                                            Album
                                        </span>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-black mb-4 text-white leading-tight">
                                        {albumData && albumData.title ? albumData.title : 'Album'}
                                    </h1>
                                    {albumData && albumData.description && (
                                        <p className="text-gray-300 text-lg mb-4 max-w-2xl leading-relaxed">
                                            {albumData.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <img
                                            src="/logo.png"
                                            className="w-6 h-6 rounded-full"
                                            alt="Bassline"
                                        />
                                        <span className="font-medium">Bassline</span>
                                        <span>•</span>
                                        <span>{albumSongs.length} songs</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 mb-8 px-2">
                            <button className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full transition-all duration-200 hover:scale-105 shadow-lg">
                                <FaPlay className="text-black text-lg ml-1" />
                            </button>
                            <button className="flex items-center justify-center w-12 h-12 border border-gray-600 hover:border-gray-400 rounded-full transition-all duration-200 hover:scale-105">
                                <FaBookmark className="text-gray-400 hover:text-white text-sm" />
                            </button>
                        </div>                        {/* Songs List Header */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-4 px-4 py-3 text-sm font-medium text-gray-400 border-b border-gray-800/50">
                            <div className="flex items-center gap-4">
                                <span className="w-4 text-center">#</span>
                                <span>Title</span>
                            </div>
                            <div className="hidden sm:block">Description</div>
                            <div className="text-center">Duration</div>
                            <div className="text-center">Actions</div>
                        </div>                        {/* Songs List */}
                        <div className="space-y-1">
                            {albumSongs.map((song, index) => {
                                const isCurrentSong = selectedSong && selectedSong.id === song.id;
                                return (
                                    <div
                                        className={`group grid grid-cols-3 sm:grid-cols-4 gap-4 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                                            isCurrentSong 
                                                ? 'bg-purple-600/20 border border-purple-500/30' 
                                                : 'hover:bg-white/5 hover:shadow-lg'
                                        }`}
                                        key={song.id || index}
                                         onClick={() => {
                                                    setSelectedSong(song.id)
                                                    setIsPlaying(true);
                                                }}
                                    >
                                        {/* Song Info */}
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="relative w-4 text-center flex-shrink-0">
                                                <span className={`text-sm font-medium ${
                                                    isCurrentSong ? 'text-purple-400' : 'text-gray-400 group-hover:text-white'
                                                }`}>
                                                    {index + 1}
                                                </span>
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <FaPlay className="text-white text-xs" />
                                                </div>
                                            </div>
                                            <div className="relative flex-shrink-0">
                                                <img
                                                    src={song.thumbnail || "/download.jpeg"}
                                                    className="w-12 h-12 rounded-md object-cover shadow-md"
                                                    alt={song.title}
                                                />
                                                {isCurrentSong && (
                                                    <div className="absolute inset-0 bg-black/30 rounded-md flex items-center justify-center">
                                                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className={`font-medium truncate ${
                                                    isCurrentSong ? 'text-purple-300' : 'text-white group-hover:text-white'
                                                }`}>
                                                    {song.title}
                                                </h3>
                                                <p className="text-sm text-gray-400 truncate">
                                                    {song.artist || 'Unknown Artist'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="hidden sm:flex items-center">
                                            <p className="text-sm text-gray-400 truncate">
                                                {song.description ? `${song.description.slice(0, 50)}...` : 'No description'}
                                            </p>
                                        </div>

                                        {/* Duration */}
                                        <div className="flex items-center justify-center">
                                            <span className="text-sm text-gray-400">
                                                {song.duration || '3:45'}
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-center gap-3">
                                            <button 
                                                className="p-2 rounded-full hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                                                title="Add to favorites"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToPlaylist(song.id);
                                                }}
                                            >
                                                <FaBookmark className="text-gray-400 hover:text-purple-400 text-sm transition-colors" />
                                            </button>
                                            <button 
                                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                                title="Play song"
                                                onClick={() => {
                                                    setSelectedSong(song.id)
                                                    setIsPlaying(true);
                                                }}
                                            >
                                                <FaPlay className="text-gray-400 hover:text-white text-sm transition-colors" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
                            <div className="absolute inset-2 border-4 border-purple-400/20 border-t-purple-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-white mb-2">Loading Album</h3>
                            <p className="text-gray-400">Please wait while we fetch your music...</p>
                        </div>
                    </div>
                )}
                </div>
            </Layout>
        </div>
    );
};

export default Album;