import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";
import toast from "react-hot-toast";

const base_url = "http://localhost:8003/api/v1";
const base_urlAdmin = "http://localhost:8001/api/v1"
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
  song: Song | null;
  albums: Album[];
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSong: string | null;
  setSelectedSong: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  fetchSingleSong: () => Promise<void>;
  nextSong: () => void;
  prevSong: () => void;
  albumSongs: Song[];
  albumData: Album | null;
  fetchAlbumSongs: (albumId: string) => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbums: () => Promise<void>;
  addNewAlbum: (album: any) => Promise<boolean>;
  addSong: (song: any) => Promise<boolean>;
}
const SongContext = createContext<SongContextType | undefined>(undefined);

const SongProvider: React.FC<SongContextProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumSongs, setAlbumSongs] = useState<Song[]>([]);
  const [albumData, setAlbumData] = useState<Album | null>(null);
  const [loadingSongs, setLoadingSongs] = useState<boolean>(true);
  const [loadingAlbums, setLoadingAlbums] = useState<boolean>(true);
  const loading = loadingSongs || loadingAlbums;
  const [selectedSong, setSelectedSong] = useState<string | null>('1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const fetchSongs = useCallback(async () => {
    setLoadingSongs(true);
    try {
      const { data } = await axios.get<Song[]>(`${base_url}/songs`);
      setSongs(data);
      if (data.length > 0) {
        setSelectedSong(data[0].id.toString());
      }
      setIsPlaying(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSongs(false);
    }
  }, []);

  const fetchAlbumSongs = useCallback(async (albumId: string) => {
    setLoadingSongs(true);
    try {
      const { data } = await axios.get<{ songs: Song[]; album: Album }>(`${base_url}/albums/${albumId}/songs`);
      console.log(data);
      setAlbumSongs(data.songs);
      setAlbumData(data.album);''
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSongs(false);
    }
  }, []);

  const fetchAlbums = useCallback(async () => {
    setLoadingAlbums(true);
    try {
      const { data } = await axios.get<Album[]>(`${base_url}/albums`);
      setAlbums(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAlbums(false);
    }
  }, []);
  const [index, setIndex] = useState<number>(0);

  const nextSong = useCallback(() => {
    if (index === songs.length - 1) {
      setIndex(0);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
      setSelectedSong(songs[index + 1].id.toString());
    }
  }, [index, songs]);

  const prevSong = useCallback(() => {
    if (index === 0) {
      setIndex(songs.length - 1);
    } else {
      setIndex((prevIndex) => prevIndex - 1);
      setSelectedSong(songs[index - 1].id.toString());
    }
  }, [index, songs]);

  const [song, setSong] = useState<Song | null>(null);
  const fetchSingleSong = useCallback(async () => {
    try {
      const { data } = await axios.get<Song>(
        `${base_url}/songs/${selectedSong}`
      );
      setSong(data);
    } catch (error) {
      console.error(error);
    }
  }, [selectedSong]);

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, [fetchSongs, fetchAlbums]);

  const addNewAlbum = useCallback(async (album: any): Promise<boolean> => {
    try {
      const formData = new FormData();
      formData.append('title', album.title);
      formData.append('description', album.description);
      if (album.thumbnail) {
        formData.append('file', album.thumbnail);
      }

      const { data } = await axios.post<Album>(`${base_urlAdmin}/album/new`, formData, {
        headers: {
          token: localStorage.getItem("token") || ""
          // Don't set Content-Type, let axios set it automatically for FormData
        },
      });
      toast.success("Album added successfully");
      // Refresh albums after successful addition
      fetchAlbums();
      return true;
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Error adding album";
      toast.error(errorMessage);
      return false;
    }
  }, [fetchAlbums]);

  const addSong = useCallback(async (song: any): Promise<boolean> => {
    try {
      const formData = new FormData();
      formData.append('title', song.title);
      formData.append('description', song.description);
      formData.append('album', song.album);
      
      // Ensure both files are present before sending
      if (!song.audio || !song.thumbnail) {
        toast.error("Both audio file and thumbnail are required");
        return false;
      }
      
      // Add audio file first (files[0] in backend)
      formData.append('file', song.audio);
      
      // Add thumbnail file second (files[1] in backend)  
      formData.append('file', song.thumbnail);

      // Debug: Log what we're sending
      console.log('Sending song data:', {
        title: song.title,
        description: song.description,
        album: song.album,
        audioFile: song.audio?.name,
        thumbnailFile: song.thumbnail?.name
      });

      const { data } = await axios.post<Song>(`${base_urlAdmin}/song/new`, formData, {
        headers: {
          token: localStorage.getItem("token") || ""
          // Don't set Content-Type, let axios set it automatically for FormData
        },
      });
      toast.success("Song added successfully");
      // Refresh songs after successful addition
      fetchSongs();
      return true;
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Error adding song";
      toast.error(errorMessage);
      return false;
    }
  }, [fetchSongs]);

  return (
    <SongContext.Provider
      value={{
        songs,
        albums,
        selectedSong,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        loading,
        song,
        fetchSingleSong,
        nextSong,
        prevSong,
        fetchAlbumSongs,
        albumSongs,
        albumData,
        fetchSongs,
        fetchAlbums,
        addNewAlbum,
        addSong
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongData = (): SongContextType => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("Use SOng data must be withing SongProvider");
  } else {
    return context;
  }
};

export default SongProvider;
