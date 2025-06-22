import express from 'express'
const router = express.Router();
import {getAllAlbum,getAllSongs,getAllSongsOfAlbum,getSong} from './controller.js'

// Define routes for the song service
router.get('/albums', getAllAlbum);
router.get('/songs', getAllSongs);
router.get('/albums/:id/songs', getAllSongsOfAlbum);
router.get('/songs/:id', getSong);
export default router;