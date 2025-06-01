import express from 'express';
const router = express.Router();
import { addAlbum,addSong,deleteSong,deleteAlbum } from './controllers.js';
import { isAuthenticated } from './middlewares.js';
import upload from './middlewares.js';
router.post('/album/new',isAuthenticated,upload, addAlbum);
router.post('/song/new',isAuthenticated,upload, addSong);
router.delete('/album/:id', isAuthenticated, deleteAlbum);
router.delete('/song/:id', isAuthenticated, deleteSong);

export default router;