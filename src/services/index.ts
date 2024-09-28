import express from 'express';
import tagRoutes from './tagRoutes';

const router = express.Router();
router.use('/tags', tagRoutes);
router.get('/', (req, res) => {
  res.send('Hello World');
});

export default router;
