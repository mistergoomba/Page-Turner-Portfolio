// Vercel serverless function adapter for Express app
import express from 'express';
import { registerRoutes } from '../server/routes';
import { serveStatic } from '../server/static';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes (async initialization)
let initialized = false;

async function init() {
  if (initialized) return;
  await registerRoutes(httpServer, app);
  
  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    // Override the static path for Vercel
    const distPath = path.resolve(__dirname, '../dist/public');
    app.use(express.static(distPath));
    app.use('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }
  initialized = true;
}

// Initialize on first request
const handler = async (req: any, res: any) => {
  await init();
  app(req, res);
};

export default handler;

