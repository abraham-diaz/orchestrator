import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import calendarRoutes from './routes/calendar.js';
import todosRoutes from './routes/todos.js';
import dashboardRoutes from './routes/dashboard.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());

// API routes
app.use('/api/calendar', calendarRoutes);
app.use('/api/todos', todosRoutes);
app.use('/api/dashboard', dashboardRoutes);

async function start() {
  if (process.env.NODE_ENV === 'production') {
    // Production: serve built frontend files
    const publicPath = path.join(__dirname, '..', 'public');
    app.use(express.static(publicPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(publicPath, 'index.html'));
    });
  } else {
    // Development: integrate Vite dev server as middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      root: path.join(__dirname, '..', '..', 'web'),
      server: { middlewareMode: true },
    });
    app.use(vite.middlewares);
  }

  app.listen(config.port, () => {
    console.log(`Orchestrator running on http://localhost:${config.port}`);
  });
}

start();
