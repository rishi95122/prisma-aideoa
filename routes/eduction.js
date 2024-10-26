import express from 'express';
import { getFiles, createFile, updateFile, deleteFile } from '../controllers/eductionFiles.js';
import { getVideos, createVideo, updateVideo, deleteVideo } from '../controllers/educationVideos.js';

const router = express.Router();


router.get('/files', getFiles);
router.post('/files', createFile);
router.put('/files/:id', updateFile);
router.delete('/files/:id', deleteFile);

router.get('/videos', getVideos);
router.post('/videos', createVideo);
router.put('/videos/:id', updateVideo);
router.delete('/videos/:id', deleteVideo);

export default router;
