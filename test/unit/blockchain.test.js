/* eslint-env jest */

const loader = require('esm')(module);
const {addBlock, initBlockchain, getGenesisBlock, getLatestBlock} = loader('../../app/blockchain');
const calculateHash = loader('../../app/calculateHash').default;
const Block = loader('../../app/Block').default;
const {block0} = loader('./fixtures/blocks.fixtures');


test('we cannot add random block', () => {
  initBlockchain();
  expect(addBlock(block0)).toBeFalsy();
});

test('can get the valid genesis block', () => {
  initBlockchain();
  const genesisBlock = getGenesisBlock();

  expect(genesisBlock.index).toBe(0);
  expect(genesisBlock.previousHash).toBe('0');
  expect(genesisBlock.timestamp).toBe(1522859419);
  expect(genesisBlock.data).toBe('Genesis Block!');
});

test('can addBlock', () => {
  initBlockchain();
  const latestBlock = getLatestBlock();

  const newBlockIndex = latestBlock.index + 1;
  const newBlockPreviousHash = latestBlock.hash;
  const newBlockTimestamp = Math.round((new Date()).getTime() / 1000);
  const newBlockData = 'Awesome data';
  const newBlockHash = calculateHash(newBlockIndex, newBlockPreviousHash, newBlockTimestamp, newBlockData);

  const newBlock = new Block(newBlockIndex, newBlockPreviousHash, newBlockTimestamp, newBlockData, newBlockHash);

  addBlock(newBlock);

  expect(JSON.stringify(getLatestBlock())).toBe(JSON.stringify(newBlock));
});
