import dotenv from 'dotenv';
import connectDB from './config';
import app from './app';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
