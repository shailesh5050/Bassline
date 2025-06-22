import { Request } from "express";
import TryCathch from "./TryCatch.js";
import getBuffer from "./config/dataUri.js";
import cloudinary from 'cloudinary';
import {sql} from "./config/db.js";
import { redisClient } from "./index.js";

interface AuthenticatedRequest extends Request {
   user ?:{
    _id: string;
    role: string;
   }
}

export const addAlbum = TryCathch(async (req:AuthenticatedRequest, res) => {
    if(req.user?.role !== "admin") {
        res.status(401).json({
            message: 'You are not authorized to add album',
        });
        return;
    }

    console.log('Full request details:', {
        bodyKeys: Object.keys(req.body),
        rawBody: req.body,
        files: req.files,
        file: req.file,
        headers: req.headers,
        contentType: req.headers['content-type']
    });
    
    // Fix the title space issue and change file field name
    const title = req.body['title ']?.toString().trim() || req.body.title?.toString().trim();
    const description = req.body.description?.toString().trim();
    const file = req.files ? (Array.isArray(req.files) ? req.files[0] : req.files.file) : req.file;
    
    if(!title || !description || !file) {
        res.status(400).json({
            message: 'Missing required fields',
            receivedFields: {
                title: title || null,
                description: description || null,
                file: file ? true : false,
                bodyContent: req.body
            }
        });
        return;
    }

    const fileBuffer = getBuffer(file);
    if(!fileBuffer || !fileBuffer.content) {
        res.status(400).json({
            message: 'Invalid file',
        });
        return;
    }

    const claude = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: 'albums',
    });

    const result = await sql `
        INSERT INTO album (title, description, thumbnail)
        VALUES (${title}, ${description}, ${claude.secure_url}) RETURNING *
    `; 

    res.status(200).json({
        message: 'Album added successfully',
        data: result[0],
    });
    // Invalidate albums cache
    if (redisClient.isReady) {
        await redisClient.del("albums");
    }
});

export const addSong = TryCathch(async (req:AuthenticatedRequest, res) => {
    if(req.user?.role !== "admin") {
        res.status(401).json({
            message: 'You are not authorized to add song',
        });
        return;
    }
    console.log(req.body)
    const { title, description, album } = req.body;
    const files = req.files;
    if(!title || !description || !files || !album) {
        res.status(400).json({
            message: 'Missing required fields',
            receivedFields: {
                title: title,
                description: description || null,
                album: album || null,
                files: files ? true : false,
                bodyContent: req.body
            }
        });
        return;
    }

    if (!Array.isArray(files) || files.length < 2) {
        res.status(400).json({
            message: 'Both song and thumbnail files are required',
        });
        return;
    }

    const songFile = files[0];
    const thumbnailFile = files[1];

    // Upload song file
    const songBuffer = getBuffer(songFile);
    if(!songBuffer || !songBuffer.content) {
        res.status(400).json({
            message: 'Invalid song file',
        });
        return;
    }
    const audio = await cloudinary.v2.uploader.upload(songBuffer.content, {
        folder: 'songs',
        resource_type: 'video', // Use 'video' for audio files 
    });

    // Upload thumbnail file
    const thumbnailBuffer = getBuffer(thumbnailFile);
    if(!thumbnailBuffer || !thumbnailBuffer.content) {
        res.status(400).json({
            message: 'Invalid thumbnail file',
        });
        return;
    }
    const thumbnail = await cloudinary.v2.uploader.upload(thumbnailBuffer.content, {
        folder: 'thumbnails',
    });

    if(!audio.secure_url || !thumbnail.secure_url) {
        res.status(400).json({
            message: 'Failed to upload audio or thumbnail',
        });
        return;
    }

    const result = await sql `
        INSERT INTO song (title, description, album_id, audio, thumbnail)
        VALUES (${title}, ${description}, ${album}, ${audio.secure_url}, ${thumbnail.secure_url}) RETURNING *
    `;

    res.status(200).json({
        message: 'Song added successfully',
        data: result[0],
    });
    // Invalidate songs and album_songs cache
    if (redisClient.isReady) {
        await redisClient.del("songs");
        if (album) {
            await redisClient.del(`album_songs_${album}`);
        }
    }
}
);

export const deleteAlbum = TryCathch(async (req:AuthenticatedRequest, res) => {
    if(req.user?.role !== "admin") {
        res.status(401).json({
            message: 'You are not authorized to delete album',
        });
        return;
    }

    const { id } = req.params;
    if(!id) {
        res.status(400).json({
            message: 'Album ID is required',
        });
        return;
    }

    const deletedAlbum = await sql `
        DELETE FROM album WHERE id = ${id} RETURNING *
    `;
    const deletedSongs = await sql `
        DELETE FROM song WHERE album_id = ${id} RETURNING *
    `;
    if(deletedAlbum.length === 0) {
        res.status(404).json({
            message: 'Album not found',
        });
        return;
    }
    if(deletedSongs.length === 0) {
        res.status(404).json({
            message: 'No songs found for this album',
        });
        return;
    }
    res.status(200).json({
        message: 'Album and associated songs deleted successfully',
        data: {
            album: deletedAlbum[0],
            songs: deletedSongs
        }
    });
    // Invalidate albums, songs, and album_songs cache
    if (redisClient.isReady) {
        await redisClient.del("albums");
        await redisClient.del("songs");
        if (id) {
            await redisClient.del(`album_songs_${id}`);
        }
    }
});

export const deleteSong = TryCathch(async (req:AuthenticatedRequest, res) => {
    if(req.user?.role !== "admin") {
        res.status(401).json({
            message: 'You are not authorized to delete song',
        });
        return;
    }

    const { id } = req.params;
    if(!id) {
        res.status(400).json({
            message: 'Song ID is required',
        });
        return;
    }

    const deletedSong = await sql `
        DELETE FROM song WHERE id = ${id} RETURNING *
    `;
    if(deletedSong.length === 0) {
        res.status(404).json({
            message: 'Song not found',
        });
        return;
    }
    res.status(200).json({
        message: 'Song deleted successfully',
        data: deletedSong[0],
    });
    // Invalidate songs, album_songs, and song cache
    if (redisClient.isReady) {
        await redisClient.del("songs");
        if (deletedSong[0]?.album_id) {
            await redisClient.del(`album_songs_${deletedSong[0].album_id}`);
        }
        if (id) {
            await redisClient.del(`song_${id}`);
        }
    }
}
);