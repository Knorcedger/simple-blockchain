import winston from 'winston';
import Block from './block';
import isValidNewBlock from './isValidNewBlock';
import calculateHash from './calculateHash';
import isValidChain from './isValidChain';

let blockchain = [];

const getGenesisBlock = () => {
  const index = 0;
  const previousHash = '0';
  const timestamp = 1522859419;
  const data = 'Genesis Block!';
  const hash = calculateHash(index, previousHash, timestamp, data);

  return new Block(index, previousHash, timestamp, data, hash);
};

const initBlockchain = () => {
  blockchain.push(getGenesisBlock());
};

const getAllBlocks = () => {
  return blockchain;
};

const getLatestBlock = () => {
  return blockchain[blockchain.length - 1];
};

const addBlock = newBlock => {
  if (isValidNewBlock(newBlock, getLatestBlock())) {
    blockchain.push(newBlock);
  }

  winston.debug('new block added');
};

const replaceChain = newBlocks => {
  if (isValidChain(newBlocks, getGenesisBlock()) && newBlocks.length > getAllBlocks().length) {
    winston.debug('Received blockchain is valid. Replacing current blockchain with received blockchain');
    blockchain = newBlocks;
    // broadcast(responseLatestMsg());
  } else {
    winston.error('Received blockchain is invalid');
  }
};

export {
  addBlock,
  initBlockchain,
  getAllBlocks,
  getGenesisBlock,
  getLatestBlock,
  replaceChain
};
