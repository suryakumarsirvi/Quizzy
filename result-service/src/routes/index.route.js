import {Router} from 'express';
import ResultRoutes from './result.routes.js';

const IndexRoutes = Router();

IndexRoutes.use('/results', ResultRoutes);

export default IndexRoutes;