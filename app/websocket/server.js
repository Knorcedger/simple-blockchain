import WebSocket from 'ws';
import {addWebSocket, getAllWebSockets} from './storage';
import messageHandler from './messageHandler';

const initWebSocketServer = server => {
  console.log('Listening WebSocket');
  const wsServer = new WebSocket.Server({server});
  wsServer.on('connection', ws => initConnection(ws));
};

const connectToPeers = peer => {
  const ws = new WebSocket(peer);
  ws.on('open', () => initConnection(ws));
  ws.on('error', () => {
    console.log('connection failed');
  });
};

const initConnection = ws => {
  addWebSocket(ws);
  messageHandler(ws);
  ws.send(JSON.stringify({
    type: 'getLatestBlock'
  }));
  console.log('ws connected');
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
