/* eslint-disable no-console */

import {getAllBlocks} from './blockchain';
import isValidChain from './isValidChain';

const replaceChain = newBlocks => {
  if (isValidChain(newBlocks) && newBlocks.length > getAllBlocks.length) {
    console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
    // blockchain = newBlocks;
    // broadcast(responseLatestMsg());
  } else {
    console.log('Received blockchain is invalid');
  }
};

export default replaceChain;
