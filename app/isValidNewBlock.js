/* eslint-disable no-console */
import calculateHash from './calculateHash';

const isValidNewBlock = (newBlock, previousBlock) => {
  if (previousBlock.index + 1 !== newBlock.index) {
    console.log('invalid index');
    return false;
  } else if (previousBlock.hash !== newBlock.previousHash) {
    console.log('invalid previousHash');
    return false;
  } else if (calculateHash(newBlock.index, newBlock.previousHash, newBlock.timestamp, newBlock.data) !== newBlock.hash) {
    console.log('invalid hash:', calculateHash(newBlock.index, newBlock.previousHash, newBlock.timestamp, newBlock.data), newBlock.hash);
    return false;
  }

  return true;
};

export default isValidNewBlock;
