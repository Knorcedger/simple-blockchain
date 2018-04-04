import express from 'express';
import bodyParser from 'body-parser';
import {initBlockchain, getAllBlocks, addBlock} from './app/blockchain';
import generateNextBlock from './app/generateNextBlock';
import {broadcast, connectToPeers, initWebSocketServer} from './app/websocket/server';
import {getAllWebSockets} from './app/websocket/storage';

const port = process.env.port || 2000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

initBlockchain();

app.get('/blocks', (req, res) => res.send(JSON.stringify(getAllBlocks())));
app.post('/mineBlock', (req, res) => {
  const newBlock = generateNextBlock(req.body);
  addBlock(newBlock);
  broadcast({
    type: 'newBlock',
    data: newBlock
  });
  // console.log('block added: ' + JSON.stringify(newBlock));
  res.send();
});
app.get('/peers', (req, res) => {
  res.send(Object.values(getAllWebSockets()).map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
});
app.post('/addPeer', (req, res) => {
  connectToPeers(req.body.peer);
  res.send();
});

const server = app.listen(port, () => console.log('Listening http on port: ' + port));
initWebSocketServer(server);
