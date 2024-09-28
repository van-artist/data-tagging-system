import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB 连接成功: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`错误: ${error.message}`);
    } else {
      console.error('发生未知错误');
    }
    process.exit(1);
  }
};

export default connectDB;
