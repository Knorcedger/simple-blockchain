/* eslint-env jest */

const loader = require('esm')(module);
const isValidNewBlock = loader('../../app/isValidNewBlock').default;
const {block0, block1, block2} = loader('./fixtures/blocks.fixtures');

test('is valid new block', () => {
  expect(isValidNewBlock(block1, block0)).toBeTruthy();
});

test('is not valid new block', () => {
  expect(isValidNewBlock(block2, block0)).toBeFalsy();
});
