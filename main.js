import express from 'express';
import bodyParser from 'body-parser';
import {initBlockchain, getAllBlocks, addBlock} from './app/blockchain';
import generateNextBlock from './app/generateNextBlock';

const port = 2000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

initBlockchain();

app.get('/blocks', (req, res) => res.send(JSON.stringify(getAllBlocks())));
app.post('/mineBlock', (req, res) => {
  const newBlock = generateNextBlock(req.body);
  addBlock(newBlock);
  // broadcast(responseLatestMsg());
  // console.log('block added: ' + JSON.stringify(newBlock));
  res.send();
});
app.get('/peers', (req, res) => {
  // res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
});
app.post('/addPeer', (req, res) => {
  // connectToPeers([req.body.peer]);
  res.send();
});
app.listen(port, () => console.log('Listening http on port: ' + port));
