import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import {initBlockchain, getAllBlocks, addBlock} from './app/blockchain';
import generateNextBlock from './app/generateNextBlock';
import {broadcast, connectToPeers, initWebSocketServer} from './app/websocket/server';
import {getAllWebSockets} from './app/websocket/storage';

// read env variables
const port = process.env.port || 2000;
winston.level = process.env.logLevel ? 'debug' : winston.level;

// initialize the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// initialize the blockchain
initBlockchain();

// define the http server endPoints

// get all blocks
app.get('/blocks', (req, res) => res.send(JSON.stringify(getAllBlocks())));

// mine a new block
app.post('/mineBlock', (req, res) => {
  const newBlock = generateNextBlock(req.body);
  addBlock(newBlock);
  broadcast({
    type: 'newBlock',
    data: newBlock
  });

  res.sendStatus(200);
});

// get all peers
app.get('/peers', (req, res) => {
  res.send(Object.values(getAllWebSockets()).map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
});

// ad a new peer
app.post('/addPeer', (req, res) => {
  connectToPeers(req.body.peer);
  res.send();
});

// initialize the http and websocket servers
const server = app.listen(port, () => winston.info('Listening http on port: ' + port));
initWebSocketServer(server);
