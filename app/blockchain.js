import Block from './block';
import isValidNewBlock from './isValidNewBlock';
import calculateHash from './calculateHash';

const getGenesisBlock = () => {
  const index = 0;
  const previousHash = '0';
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const data = 'Genesis Block!';
  const hash = calculateHash(index, previousHash, timestamp, data);

  return new Block(index, previousHash, timestamp, data, hash);
};

const blockchain = [];

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

  console.log(blockchain);
};

export {
  addBlock,
  initBlockchain,
  getAllBlocks,
  getGenesisBlock,
  getLatestBlock
};
