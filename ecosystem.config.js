module.exports = {
  apps: [
    {
      name: 'data_tag',
      script: 'dist/main.js',
      env: {
        MONGO_URI: 'mongodb://localhost:27017/tagging_system',
        PORT: 8888,
      },
    },
  ],
};
