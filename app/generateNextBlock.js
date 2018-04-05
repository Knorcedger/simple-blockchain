import Block from './block.js';
import calculateHash from './calculateHash';
import {getLatestBlock} from './blockchain';

const generateNextBlock = blockData => {
  const previousBlock = getLatestBlock();
  const nextIndex = previousBlock.index + 1;
  const nextTimestamp = Math.round((new Date()).getTime() / 1000);
  const nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
  return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
};

export default generateNextBlock;
