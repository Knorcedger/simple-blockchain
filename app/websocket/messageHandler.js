import {addBlock, getAllBlocks, getLatestBlock, replaceChain} from '../blockchain';
import {getAllWebSockets} from './storage';
// import {broadcast} from './server';

const messageHandler = ws => {
  ws.on('message', data => {
    console.log('ws:', data);
    const message = JSON.parse(data);
    if (message.type === 'newBlock') {
      newBlockHandler(message.data);
    } else if (message.type === 'getAllBlocks') {
      getAllBlocksHandler(ws);
    } else if (message.type === 'allBlocks') {
      allBlocksHandler(message.data);
    } else if (message.type === 'getLatestBlock') {
      getLatestBlockHandler(ws);
    } else if (message.type === 'latestBlock') {
      latestBlockHandler(message.data);
    }
  });
};

const newBlockHandler = newBlock => {
  const latestBlock = getLatestBlock();
  if (latestBlock.index + 1 === newBlock.index) {
    if (latestBlock.hash === newBlock.previousHash) {
      // we dont validate the new hash here because with PoW this is expensive
      addBlock(newBlock);
    }
  } else if (latestBlock.index + 1 < newBlock.index) {
    // we are missing more blocks, ask for the whole chain
    Object.values(getAllWebSockets())[0].send(JSON.stringify({
      type: 'getAllBlocks'
    }));
  }
};

const getAllBlocksHandler = ws => {
  ws.send(JSON.stringify({
    type: 'allBlocks',
    data: getAllBlocks()
  }));
};

const allBlocksHandler = data => {
  replaceChain(data);
};

const getLatestBlockHandler = ws => {
  ws.send(JSON.stringify({
    type: 'latestBlock',
    data: getLatestBlock()
  }));
};

const latestBlockHandler = remoteLatestBlock => {
  const localLatestBlock = getLatestBlock();
  if (remoteLatestBlock.index === localLatestBlock.index) {
    console.log('blockchain already in sync');
  } else if (remoteLatestBlock.index < localLatestBlock.index) {
    // dont broadcast for not, the other peer with request it
    // broadcast({
    //   type: 'allBlocks',
    //   data: JSON.stringify(getAllBlocks())
    // });
  } else if (remoteLatestBlock.index > localLatestBlock.index) {
    console.log('we are missing blocks');
    // we are missing blocks, ask for the whole chain
    // could also check if we miss 1 or more
    Object.values(getAllWebSockets())[0].send(JSON.stringify({
      type: 'getAllBlocks'
    }));
  }
};

export default messageHandler;
