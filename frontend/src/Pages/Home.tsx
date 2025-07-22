import { Layout } from "../Components/Layout";
import { useSongData } from '../context/SongContext';
import AlbumCard from "../Components/AlbumCard";
import SongCard from "../Components/SongCard";
import Loading from "../Components/Loading";

const Home = () => {
  const { albums, songs, loading } = useSongData();
  if (loading) return <Loading />;

  return (
    <div>
      <Layout>
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
            <h1 className="text-3xl font-bold gradient-text">Good evening</h1>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="glass rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎵</span>
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-purple-400 transition-colors duration-300">Liked Songs</h3>
                  <p className="text-sm text-gray-400">Your favorite tracks</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎧</span>
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-blue-400 transition-colors duration-300">Recently Played</h3>
                  <p className="text-sm text-gray-400">Jump back in</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-orange-400 transition-colors duration-300">Trending Now</h3>
                  <p className="text-sm text-gray-400">What's hot today</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Albums Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">Featured Albums</h2>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium">
              Show all
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {albums.map((album, index) => (
              <div key={album.id} className="animate-fade-in-up flex-shrink-0" style={{ animationDelay: `${index * 100}ms` }}>
                <AlbumCard
                  image={album.thumbnail || ""}
                  name={album.title}
                  desc={album.description}
                  id={album.id.toString()}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Songs Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">Popular Songs</h2>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium">
              Show all
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {songs.map((song, index) => (
              <div key={song.id} className="animate-fade-in-up flex-shrink-0" style={{ animationDelay: `${index * 100}ms` }}>
                <SongCard
                  image={song.thumbnail || ""}
                  name={song.title}
                  desc={song.description}
                  id={song.id.toString()}
                />
              </div>
            ))}
          </div>
        </div>


      </Layout>
    </div>
  );
};

export default Home