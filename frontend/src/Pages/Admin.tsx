import { useUserContext } from "../context/UserContext";
import { useSongData } from "../context/SongContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Admin = () => {
    const { user } = useUserContext();
    const { songs, albums, fetchAlbums, fetchSongs, addNewAlbum, addSong, deleteSong, deleteAlbum } = useSongData();
    const navigate = useNavigate();
    // Album form states
    const [albumTitle, setAlbumTitle] = useState<string>("");
    const [albumDescription, setAlbumDescription] = useState<string>("");
    const [albumThumbnail, setAlbumThumbnail] = useState<File | null>(null);

    // Song form states
    const [songTitle, setSongTitle] = useState<string>("");
    const [songDescription, setSongDescription] = useState<string>("");
    const [songThumbnail, setSongThumbnail] = useState<File | null>(null);
    const [audio, setAudio] = useState<File | null>(null);
    const [selectedAlbum, setSelectedAlbum] = useState<string>("");
    const [isUploadingAlbum, setIsUploadingAlbum] = useState<boolean>(false);
    const [isUploadingSong, setIsUploadingSong] = useState<boolean>(false);
    const [deletingAlbumId, setDeletingAlbumId] = useState<number | null>(null);
    const [deletingSongId, setDeletingSongId] = useState<number | null>(null);

    const handleDeleteAlbum = async (albumId: number) => {
        setDeletingAlbumId(albumId);
        try {
            await deleteAlbum(albumId);
        } finally {
            setDeletingAlbumId(null);
        }
    };

    const handleDeleteSong = async (songId: number) => {
        setDeletingSongId(songId);
        try {
            await deleteSong(songId);
        } finally {
            setDeletingSongId(null);
        }
    };

    const albumFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file && e.target.name === "albumThumbnail") {
            setAlbumThumbnail(file);
        }
    };

    const songFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            if (e.target.name === "songThumbnail") {
                setSongThumbnail(file);
            } else if (e.target.name === "audio") {
                setAudio(file);
            }
        }
    };

    const handleAlbumSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUploadingAlbum(true);

        try {
            const success = await addNewAlbum({
                title: albumTitle,
                description: albumDescription,
                thumbnail: albumThumbnail
            });

            // Only reset form if upload was successful
            if (success) {
                setAlbumTitle("");
                setAlbumDescription("");
                setAlbumThumbnail(null);
            }

        } catch (error) {
            console.error("Error uploading album:", error);
        } finally {
            setIsUploadingAlbum(false);
        }
    };

    const handleSongSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUploadingSong(true);

        try {
            const success = await addSong({
                title: songTitle,
                description: songDescription,
                album: selectedAlbum,
                audio: audio,
                thumbnail: songThumbnail
            });

            // Only reset form if upload was successful
            if (success) {
                setSongTitle("");
                setSongDescription("");
                setSelectedAlbum("");
                setAudio(null);
                setSongThumbnail(null);
            }

        } catch (error) {
            console.error("Error uploading song:", error);
        } finally {
            setIsUploadingSong(false);
        }
    };

    useEffect(() => {
        if (user?.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 p-8 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-12 animate-fade-in">
                    <div>
                        <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
                        <p className="text-gray-400">Manage your music library</p>
                    </div>
                    <a
                        href="/"
                        className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                    >
                        <span className="relative z-10">← Back to Home</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </a>
                </div>

                {/* Forms Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Add Album Form */}
                    <div className="glass rounded-2xl p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 animate-slide-up">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-xl">🎵</span>
                            </div>
                            <h2 className="text-2xl font-bold">Add Album</h2>
                        </div>
                        <form className="space-y-4" onSubmit={handleAlbumSubmit}>
                            <div className="group">
                                <input
                                    type="text"
                                    placeholder="Album Title"
                                    value={albumTitle}
                                    onChange={(e) => setAlbumTitle(e.target.value)}
                                    className="auth-input group-hover:border-purple-500/50 transition-all duration-300 focus:scale-[1.02]"
                                />
                            </div>
                            <div className="group">
                                <textarea
                                    placeholder="Album Description"
                                    value={albumDescription}
                                    onChange={(e) => setAlbumDescription(e.target.value)}
                                    rows={3}
                                    className="auth-input resize-none group-hover:border-purple-500/50 transition-all duration-300 focus:scale-[1.02]"
                                />
                            </div>
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Album Cover</label>
                                <input
                                    type="file"
                                    name="albumThumbnail"
                                    onChange={albumFileChangeHandler}
                                    className="auth-input group-hover:border-purple-500/50 transition-all duration-300"
                                    accept="image/*"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isUploadingAlbum}
                                className="auth-btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {isUploadingAlbum ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Add Album</span>
                                            <span className="text-lg">✨</span>
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>
                    </div>

                    {/* Add Song Form */}
                    <div className="glass rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                <span className="text-xl">🎤</span>
                            </div>
                            <h2 className="text-2xl font-bold">Add Song</h2>
                        </div>
                        <form className="space-y-4" onSubmit={handleSongSubmit}>
                            <div className="group">
                                <input
                                    type="text"
                                    placeholder="Song Title"
                                    value={songTitle}
                                    onChange={(e) => setSongTitle(e.target.value)}
                                    className="auth-input group-hover:border-blue-500/50 transition-all duration-300 focus:scale-[1.02]"
                                />
                            </div>
                            <div className="group">
                                <textarea
                                    placeholder="Song Description"
                                    value={songDescription}
                                    onChange={(e) => setSongDescription(e.target.value)}
                                    rows={3}
                                    className="auth-input resize-none group-hover:border-blue-500/50 transition-all duration-300 focus:scale-[1.02]"
                                />
                            </div>
                            <div className="group">
                                <select
                                    value={selectedAlbum}
                                    onChange={(e) => setSelectedAlbum(e.target.value)}
                                    className="auth-input group-hover:border-blue-500/50 transition-all duration-300 focus:scale-[1.02]"
                                >
                                    <option value="">Choose Album</option>
                                    {albums?.map((album) => (
                                        <option key={album.id} value={album.id}>
                                            {album.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Audio File</label>
                                <input
                                    type="file"
                                    name="audio"
                                    onChange={songFileChangeHandler}
                                    className="auth-input group-hover:border-blue-500/50 transition-all duration-300"
                                    accept="audio/*"
                                />
                            </div>
                            <div className="group">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Song Thumbnail</label>
                                <input
                                    type="file"
                                    name="songThumbnail"
                                    onChange={songFileChangeHandler}
                                    className="auth-input group-hover:border-blue-500/50 transition-all duration-300"
                                    accept="image/*"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isUploadingSong}
                                className="auth-btn bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {isUploadingSong ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Add Song</span>
                                            <span className="text-lg">🎶</span>
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Albums Section */}
                <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                            <span className="text-lg">📀</span>
                        </div>
                        <h3 className="text-3xl font-bold">Albums Collection</h3>
                        <div className="music-bars ml-4">
                            <div className="music-bar"></div>
                            <div className="music-bar"></div>
                            <div className="music-bar"></div>
                            <div className="music-bar"></div>
                        </div>
                    </div>

                    <div className="glass rounded-2xl overflow-hidden">
                        {albums && albums.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-green-500/20 to-teal-500/20">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-green-400 uppercase tracking-wider">Thumbnail</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-green-400 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-green-400 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-green-400 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-green-400 uppercase tracking-wider">Artist</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-green-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700/50">
                                        {albums.map((album, index) => (
                                            <tr key={album.id} className="hover:bg-green-500/5 transition-colors duration-200">
                                                <td className="px-6 py-4">
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                                                        {album.thumbnail ? (
                                                            <img
                                                                src={album.thumbnail}
                                                                alt={album.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                                                                <span className="text-2xl opacity-50">🎵</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-300">#{album.id}</td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-white">{album.title}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-400 max-w-xs truncate">{album.description}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-400">{album.artist || 'N/A'}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => handleDeleteAlbum(album.id)}
                                                        disabled={deletingAlbumId === album.id}
                                                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                                    >
                                                        {deletingAlbumId === album.id ? (
                                                            <span className="flex items-center justify-center gap-2">
                                                                <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                                                Deleting...
                                                            </span>
                                                        ) : (
                                                            'Delete'
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4 opacity-50">🎵</div>
                                <p className="text-gray-400 text-lg">No albums found. Add your first album above!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Songs Section */}
                <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                            <span className="text-lg">🎧</span>
                        </div>
                        <h3 className="text-3xl font-bold">Songs Library</h3>
                        <div className="music-bars ml-4">
                            <div className="music-bar"></div>
                            <div className="music-bar"></div>
                            <div className="music-bar"></div>
                            <div className="music-bar"></div>
                        </div>
                    </div>

                    <div className="glass rounded-2xl overflow-hidden">
                        {songs && songs.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-orange-500/20 to-red-500/20">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-orange-400 uppercase tracking-wider">Thumbnail</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-orange-400 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-orange-400 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-orange-400 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-orange-400 uppercase tracking-wider">Artist</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-orange-400 uppercase tracking-wider">Album</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-orange-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700/50">
                                        {songs.map((song) => {
                                            const albumTitle = albums?.find(album => album.id === song.album_id)?.title || 'N/A';
                                            return (
                                                <tr key={song.id} className="hover:bg-orange-500/5 transition-colors duration-200">
                                                    <td className="px-6 py-4">
                                                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                                                            {song.thumbnail ? (
                                                                <img
                                                                    src={song.thumbnail}
                                                                    alt={song.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                                                                    <span className="text-2xl opacity-50">🎤</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-300">#{song.id}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-white">{song.title}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-400 max-w-xs truncate">{song.description}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-400">{song.artist || 'N/A'}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-400">{albumTitle}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button
                                                            onClick={() => handleDeleteSong(song.id)}
                                                            disabled={deletingSongId === song.id}
                                                            className="px-4 py-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                                        >
                                                            {deletingSongId === song.id ? (
                                                                <span className="flex items-center justify-center gap-2">
                                                                    <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                                                    Deleting...
                                                                </span>
                                                            ) : (
                                                                'Delete'
                                                            )}
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4 opacity-50">🎤</div>
                                <p className="text-gray-400 text-lg">No songs found. Add your first song above!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;