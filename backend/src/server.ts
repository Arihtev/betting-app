import { initializeApp } from './app';
import { config } from './utils/config';

const PORT = config.port || 3000;

const startServer = async () => {
  try {
    const app = await initializeApp();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
