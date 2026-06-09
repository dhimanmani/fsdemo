require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  let port = Number(process.env.PORT) || 5000;
  const maxAttempts = 10;
  let attempts = 0;
  const launch = () => {
    const server = app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        if (attempts >= maxAttempts) {
          console.error(`All ${maxAttempts} port attempts exhausted. Exiting.`);
          process.exit(1);
        }
        console.warn(`Port ${port} in use, trying next port...`);
        port += 1;
        attempts += 1;
        launch();
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
  };
  launch();
};

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
