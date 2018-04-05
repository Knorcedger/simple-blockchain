import Block from '../../../app/block';
import calculateHash from '../../../app/calculateHash';

const block0Index = 0;
const block0PreviousHash = '0';
const block0Timestamp = 1;
const block0Data = '';
const block0Hash = calculateHash(block0Index, block0PreviousHash, block0Timestamp, block0Data);

const block0 = new Block(block0Index, block0PreviousHash, block0Timestamp, block0Data, block0Hash);
const block1Hash = calculateHash(1, block0Hash, 2, '');
const block1 = new Block(1, block0Hash, 2, '', block1Hash);
const block2 = new Block(2, block1Hash, 3, '', calculateHash(2, block1Hash, 3, ''));

export {
  block0,
  block1,
  block2
};
