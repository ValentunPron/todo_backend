import express from 'express';
import { getWorks, postWork, removeWork, setStatus, updateWork } from '../controllers/worksController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

//router.use(requireAuth);

router.get('/get', getWorks);
router.post('/post', postWork);
router.patch('/updateWork/:id', updateWork);
router.delete('/removeWork/:id', removeWork);
router.patch('/status/:id', setStatus);

export default router;