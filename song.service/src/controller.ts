import { sql } from "./config/db.js";
import TryCathch from "./TryCatch.js";
import { redisClient } from "./index.js";

export const getAllAlbum = TryCathch(async (req, res) => {
  let albums;
  if (redisClient.isReady) {
    albums = await redisClient.get("albums");

    if (albums) {
      console.log("Cache hit");
      res.json(JSON.parse(albums));
      return;
    } else {
      console.log("Cache miss");
      albums = await sql`select * from album`;
      await redisClient.set("albums", JSON.stringify(albums), { EX: 1800 });
      res.json(albums);
    }
  }
});

// Add Redis cache for all songs
export const getAllSongs = TryCathch(async (req, res) => {
  let songs;
  if (redisClient.isReady) {
    songs = await redisClient.get("songs");
    if (songs) {
      console.log("Cache hit");
      res.json(JSON.parse(songs));
      return;
    } else {
      console.log("Cache miss");
      songs = await sql`select * from song`;
      await redisClient.set("songs", JSON.stringify(songs), { EX: 1800 });
      res.json(songs);
    }
  }
});

// Add Redis cache for all songs of an album
export const getAllSongsOfAlbum = TryCathch(async (req, res) => {
  const { id } = req.params;
  const cacheKey = `album_songs_${id}`;
  if (redisClient.isReady) {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log("Cache hit");
      res.json(JSON.parse(cached));
      return;
    }
  }
  let albums = await sql`select * from album where id=${id}`;
  if (albums.length == 0) {
    res.status(404).json({
      message: "No Album found",
    });
    return;
  }
  let songs = await sql`select * from song where album=${id}`;
  const response = { songs, album: albums[0] };
  if (redisClient.isReady) {
    await redisClient.set(cacheKey, JSON.stringify(response), { EX: 1800 });
  }
  res.json(response);
});

// Add Redis cache for a single song
export const getSong = TryCathch(async (req, res) => {
  const { id } = req.params;
  const cacheKey = `song_${id}`;
  if (redisClient.isReady) {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log("Cache hit");
      res.json(JSON.parse(cached));
      return;
    }
  }
  const song = await sql`select * from song where id=${id}`;
  const response = song.length > 0 ? song[0] : { message: "No song found" };
  if (redisClient.isReady) {
    await redisClient.set(cacheKey, JSON.stringify(response), { EX: 1800 });
  }
  res.json(response);
});
