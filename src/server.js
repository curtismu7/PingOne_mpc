#!/usr/bin/env node

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3004',
    'https://localhost:3004'
  ],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// MPC computation endpoint
app.post('/api/mpc/compute', (req, res) => {
  const { computationId, participants, operation, inputs } = req.body;
  
  console.log('MPC computation requested:', { computationId, operation });
  
  let result;
  switch (operation) {
    case 'add':
      result = inputs.reduce((sum, input) => sum + input, 0);
      break;
    case 'multiply':
      result = inputs.reduce((product, input) => product * input, 1);
      break;
    case 'compare':
      result = inputs[0] > inputs[1];
      break;
    default:
      result = 'Unknown operation';
  }
  
  res.json({
    success: true,
    computationId: computationId || 'generated-id',
    status: 'completed',
    result: result,
    message: 'MPC computation completed'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'OAuth Playground MPC Server',
    version: '1.0.0',
    description: 'Multi-Party Computation server for OAuth Playground',
    endpoints: {
      health: '/health',
      mpc: '/api/mpc/compute'
    }
  });
});

// Create HTTP server
const server = createServer(app);

// WebSocket server
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('WebSocket message received:', data);
      
      if (data.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
      } else if (data.type === 'mpc_computation') {
        setTimeout(() => {
          ws.send(JSON.stringify({
            type: 'mpc_result',
            computationId: data.computationId,
            result: { success: true, data: 'MPC computation completed' }
          }));
        }, 1000);
      }
    } catch (error) {
      console.error('WebSocket error:', error);
    }
  });
  
  ws.send(JSON.stringify({
    type: 'welcome',
    message: 'Connected to OAuth Playground MPC Server'
  }));
});

// Start server
server.listen(PORT, HOST, () => {
  console.log(`🚀 OAuth Playground MPC Server running on http://${HOST}:${PORT}`);
  console.log(`📡 WebSocket server available at ws://${HOST}:${PORT}/ws`);
});

export default app;
