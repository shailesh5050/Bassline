import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";

const base_url = "http://localhost:8003/api/v1";
export interface Song {
  id: number;
  title: string;
  description: string;
  thumbnail: string | null;
  album_id: number | null;
  audio: string;
  artist: string | null;
}
export interface Album {
  id: number;
  title: string;
  description: string;
  thumbnail: string | null;
  album_id: number | null;
  artist: string | null;
}

interface SongContextProps {
  children: ReactNode;
}

interface SongContextType {
  songs: Song[];
  albums: Album[];
  isPlaying:boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSong: string | null;
  setSelectedSong: React.Dispatch<React.SetStateAction<string | null>>;
  loading:boolean;
}
const SongContext = createContext<SongContextType | undefined>(undefined);

const SongProvider: React.FC<SongContextProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading,setLoading] = useState<boolean>(true)
  const [selectedSong,setSelectedSong] = useState<string | null>(null)
  const [isPlaying,setIsPlaying] = useState<boolean>(false)
  const fetchSongs = useCallback(async()=>{
        setLoading(true)
        try {
            const {data} = await axios.get<Song[]>(`${base_url}/songs`);
            setSongs(data)
            if(data.length>0){
                setSelectedSong(data[0].id.toString())
            }
            setIsPlaying(false)

        } catch (error) {
            console.error(error)
        }finally{
          setLoading(false)
        }
  },[])

  const fetchAlbums = useCallback(async()=>{
        setLoading(true)
        try {
            const {data} = await axios.get<Album[]>(`${base_url}/albums`);
            setAlbums(data)
        } catch (error) {
            console.error(error)
        }finally{
          setLoading(false)
        }
  },[])
  const [song, setSong] = useState<Song | null>(null);
  const fetchSingleSong = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Song>(`${base_url}/songs/${selectedSong}`);
      setSong(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [selectedSong]);

  useEffect(()=>{
    fetchSongs()
    fetchAlbums();
  },[])

  return (
    <SongContext.Provider value={{ songs,albums,selectedSong, setSelectedSong, isPlaying,setIsPlaying,loading }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongData = ():SongContextType =>{
    const context = useContext(SongContext)
    if(!context){
        throw new Error("Use SOng data must be withing SongProvider")
    }else{
        return context
    }
}

export default SongProvider;
