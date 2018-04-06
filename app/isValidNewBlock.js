import winston from 'winston';
import calculateHash from './calculateHash';

const isValidNewBlock = (newBlock, previousBlock) => {
  const n = newBlock;

  if (previousBlock.index + 1 !== newBlock.index) {
    winston.error('invalid index');
    return false;
  } else if (previousBlock.hash !== newBlock.previousHash) {
    winston.error('invalid previousHash');
    return false;
  } else if (calculateHash(n.index, n.previousHash, n.timestamp, n.data) !== n.hash) {
    winston.error('invalid hash:', calculateHash(n.index, n.previousHash, n.timestamp, n.data), n.hash);
    return false;
  }

  return true;
};

export default isValidNewBlock;
