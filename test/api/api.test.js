/* eslint-env jest */

const loader = require('esm')(module);
const fetch = require('node-fetch');
const spawn = require('child_process').spawn;
const {getGenesisBlock} = loader('../../app/blockchain');

test('two plus two is four', async () => {
  const pack = spawn('npm', ['start'], {env: process.env});
  const response = await fetch('http://localhost:2000/blocks');
  const chain = await response.json();
  pack.kill();

  expect(chain.length).toBe(1);
  expect(JSON.stringify(getGenesisBlock())).toBe(JSON.stringify(chain[0]));
});
