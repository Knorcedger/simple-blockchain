/* eslint-env jest */

const loader = require('esm')(module);
const isValidChain = loader('../../app/isValidChain').default;
const {block0, block1, block2} = loader('./fixtures/blocks.fixtures');

test('is valid chain', () => {
  expect(isValidChain([block0, block1], block0)).toBeTruthy();
});

test('is not valid chain', () => {
  expect(isValidChain([block0, block2], block0)).toBeFalsy();
});
