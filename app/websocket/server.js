import WebSocket from 'ws';
import winston from 'winston';
import {addWebSocket, getAllWebSockets} from './storage';
import messageHandler from './messageHandler';

const initWebSocketServer = server => {
  winston.info('Listening WebSocket');
  const wsServer = new WebSocket.Server({server});
  wsServer.on('connection', ws => initConnection(ws));
};

const connectToPeers = peer => {
  const ws = new WebSocket(peer);
  ws.on('open', () => initConnection(ws));
  ws.on('error', () => {
    winston.error('connection failed');
  });
};

const initConnection = ws => {
  addWebSocket(ws);
  messageHandler(ws);
  ws.send(JSON.stringify({
    type: 'getLatestBlock'
  }));
  winston.info('ws connected');
};

const broadcast = message => Object.values(getAllWebSockets()).forEach(webSocket => {
  if (webSocket.readyState === WebSocket.OPEN) {
    webSocket.send(JSON.stringify(message));
  }
});

export {
  broadcast,
  connectToPeers,
  initWebSocketServer
};
