import express from 'express';
import cors from 'cors';
import router from './services/index';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);
app.use('/static', express.static(path.join(__dirname, '../public')));

export default app;
