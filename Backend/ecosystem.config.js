module.exports = {
  apps: [
    {
      name: "backend",
      script: "./index.js",
      env: {
        NODE_ENV: "development",
        PORT: 1001,
      },
    },
  ],
};
