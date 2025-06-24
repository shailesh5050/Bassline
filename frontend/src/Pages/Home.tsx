import { Layout } from "../Components/Layout"
import { useSongData } from '../context/SongContext';
import AlbumCard from "../Components/AlbumCard";
import SongCard from "../Components/SongCard";
const Home = () => {
  const {albums,songs} = useSongData();
  return (
    <div>
        <Layout>
          <div className="mb-4">
            <div className="my-5 font-bold text-2xl">
              <div className="flex overflow-auto">
                {albums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    image={album.thumbnail}
                    name={album.title}
                    desc={album.description}
                    id={album.id.toString()}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Songs Card */}
          <div className="mb-4">
            <div className="my-5 font-bold text-2xl">
              <div className="flex overflow-auto">
                {songs.map((song) => (
                  <SongCard
                    key={song.id}
                    image={song.thumbnail}
                    name={song.title}
                    desc={song.description}
                    id={song.id.toString()}
                  />
                ))}
              </div>
            </div>
          </div>
        </Layout>
    </div>
  )
}

export default Home