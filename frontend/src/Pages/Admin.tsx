import { useUserContext } from "../context/UserContext";
import { useSongData } from "../context/SongContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Admin = () => {
    const { user } = useUserContext();
    const { songs, albums, fetchAlbums, fetchSongs, addNewAlbum, addSong } = useSongData();
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Sample Album Card */}
                        <div className="album-card glass rounded-2xl p-6 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 group cursor-pointer">
                            <div className="relative mb-4 overflow-hidden rounded-xl">
                                <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                                    <span className="text-4xl opacity-50">🎵</span>
                                </div>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button className="play-button w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                                        ▶
                                    </button>
                                </div>
                            </div>
                            <h4 className="text-lg font-bold mb-2 group-hover:text-green-400 transition-colors">Sample Album</h4>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">This is a sample album description...</p>
                            <button className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500">
                                Delete Album
                            </button>
                        </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Sample Song Card */}
                        <div className="glass rounded-2xl p-6 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 group">
                            <div className="flex flex-col items-center gap-4 mb-4">
                                <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                    <span className="text-3xl opacity-50">🎤</span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="thumbnail-upload"
                                        accept="image/*"
                                    />
                                    <label
                                        htmlFor="thumbnail-upload"
                                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 text-sm"
                                    >
                                        Add Thumbnail
                                    </label>
                                </div>
                            </div>
                            <h4 className="text-lg font-bold mb-2 group-hover:text-orange-400 transition-colors">Sample Song</h4>
                            <p className="text-gray-400 text-sm mb-4">This is a sample song description...</p>
                            <button className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500">
                                Delete Song
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;