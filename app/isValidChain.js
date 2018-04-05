import isValidNewBlock from './isValidNewBlock';

const isValidChain = (blockchain, genesisBlock) => {
  if (JSON.stringify(blockchain[0]) !== JSON.stringify(genesisBlock)) {
    console.log('invalid genesis');
    return false;
  }

  let tempBlocks = [blockchain[0]];
  for (let i = 1; i < blockchain.length; i++) {
    if (isValidNewBlock(blockchain[i], tempBlocks[i - 1])) {
      tempBlocks.push(blockchain[i]);
    } else {
      return false;
    }
  }

  return true;
};

export default isValidChain;
