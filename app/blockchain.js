import Block from './block';
import isValidNewBlock from './isValidNewBlock';

const getGenesisBlock = () => {
  return new Block(0, '0', 1465154705, 'my genesis block!!', '12345');
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
