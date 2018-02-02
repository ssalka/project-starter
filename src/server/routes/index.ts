import * as express from 'express';
import { indexHtml } from '../config';

const router = express.Router();

router.get('/*', (req, res) => res.sendFile(indexHtml));

export default router;
