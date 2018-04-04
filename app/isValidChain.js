import {getGenesisBlock} from './blockchain';
import isValidNewBlock from './isValidNewBlock';

const isValidChain = blockchain => {
  if (JSON.stringify(blockchain[0]) !== JSON.stringify(getGenesisBlock())) {
    console.log('invalid genesis');
    console.log(JSON.stringify(blockchain[0]));
    console.log(JSON.stringify(getGenesisBlock()));
    return false;
  }

  let tempBlocks = [blockchain[0]];
  for (let i = 1; i < blockchain.length; i++) {
    if (isValidNewBlock(blockchain[i]), tempBlocks[i - 1]) {
      tempBlocks.push(blockchain[i]);
    } else {
      return false;
    }
  }

  return true;
};

export default isValidChain;
