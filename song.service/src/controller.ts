import { sql } from "./config/db.js";
import TryCathch from "./TryCatch.js";
import { redisClient } from "./index.js";

export const getAllAlbum = TryCathch(async (req, res) => {
  let albums;
  try {
    if (redisClient.isReady) {
      albums = await redisClient.get("albums");

      if (albums) {
        console.log("Cache hit");
        res.json(JSON.parse(albums));
        return;
      }
    }
    console.log("Cache miss or Redis unavailable");
    albums = await sql`select * from album`;
    
    // Try to cache if Redis is available
    if (redisClient.isReady) {
      try {
        await redisClient.set("albums", JSON.stringify(albums), { EX: 1800 });
      } catch (cacheError: any) {
        console.log("Failed to cache albums:", cacheError.message);
      }
    }
    res.json(albums);
  } catch (error: any) {
    console.error("Error in getAllAlbum:", error);
    // Fallback to database only
    albums = await sql`select * from album`;
    res.json(albums);
  }
});

// Add Redis cache for all songs
export const getAllSongs = TryCathch(async (req, res) => {
  let songs;
  try {
    if (redisClient.isReady) {
      songs = await redisClient.get("songs");
      if (songs) {
        console.log("Cache hit");
        res.json(JSON.parse(songs));
        return;
      }
    }
    console.log("Cache miss or Redis unavailable");
    songs = await sql`select * from song`;
    
    // Try to cache if Redis is available
    if (redisClient.isReady) {
      try {
        await redisClient.set("songs", JSON.stringify(songs), { EX: 1800 });
      } catch (cacheError: any) {
        console.log("Failed to cache songs:", cacheError.message);
      }
    }
    res.json(songs);
  } catch (error: any) {
    console.error("Error in getAllSongs:", error);
    // Fallback to database only
    songs = await sql`select * from song`;
    res.json(songs);
  }
});

// Add Redis cache for all songs of an album
export const getAllSongsOfAlbum = TryCathch(async (req, res) => {
  const { id } = req.params;
  const cacheKey = `album_songs_${id}`;
  try {
    if (redisClient.isReady) {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        console.log("Cache hit");
        res.json(JSON.parse(cached));
        return;
      }
    }
    console.log("Cache miss or Redis unavailable");
    let albums = await sql`select * from album where id=${id}`;
    if (albums.length == 0) {
      res.status(404).json({
        message: "No Album found",
      });
      return;
    }
    let songs = await sql`select * from song where album=${id}`;
    const response = { songs, album: albums[0] };
    
    // Try to cache if Redis is available
    if (redisClient.isReady) {
      try {
        await redisClient.set(cacheKey, JSON.stringify(response), { EX: 1800 });
      } catch (cacheError: any) {
        console.log("Failed to cache album songs:", cacheError.message);
      }
    }
    res.json(response);
  } catch (error: any) {
    console.error("Error in getAllSongsOfAlbum:", error);
    // Fallback to database only
    let albums = await sql`select * from album where id=${id}`;
    if (albums.length == 0) {
      res.status(404).json({
        message: "No Album found",
      });
      return;
    }
    let songs = await sql`select * from song where album=${id}`;
    const response = { songs, album: albums[0] };
    res.json(response);
  }
});

// Add Redis cache for a single song
export const getSong = TryCathch(async (req, res) => {
  const { id } = req.params;
  const cacheKey = `song_${id}`;
  try {
    if (redisClient.isReady) {
      const cached = await redisClient.get(cacheKey);
      if (cached) {
        console.log("Cache hit");
        res.json(JSON.parse(cached));
        return;
      }
    }
    console.log("Cache miss or Redis unavailable");
    const song = await sql`select * from song where id=${id}`;
    const response = song.length > 0 ? song[0] : { message: "No song found" };
    
    // Try to cache if Redis is available
    if (redisClient.isReady) {
      try {
        await redisClient.set(cacheKey, JSON.stringify(response), { EX: 1800 });
      } catch (cacheError: any) {
        console.log("Failed to cache song:", cacheError.message);
      }
    }
    res.json(response);
  } catch (error: any) {
    console.error("Error in getSong:", error);
    // Fallback to database only
    const song = await sql`select * from song where id=${id}`;
    const response = song.length > 0 ? song[0] : { message: "No song found" };
    res.json(response);
  }
});
