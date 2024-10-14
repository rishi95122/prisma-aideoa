import express from 'express'
import { addSocialMediaLink, deleteSocialMediaLink, getAllSocialMediaLinks, updateSocialMediaLink } from '../controllers/links.js';

const router = express.Router();


router.post('/add',addSocialMediaLink );


router.get('/getAll',getAllSocialMediaLinks );


router.put('/update/:id' ,updateSocialMediaLink);


router.delete('/delete/:id',deleteSocialMediaLink);

export default router