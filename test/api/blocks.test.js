/* eslint-env jest */

const loader = require('esm')(module);
const fetch = require('node-fetch');
const delay = require('delay');
const spawn = require('child_process').spawn;
const {getGenesisBlock} = loader('../../app/blockchain');

describe('api calls', () => {
  let server;
  let server2;

  beforeEach(async done => {
    process.env.port = 2000;
    server = spawn('npm', ['run', 'start:simple'], {stdio: 'inherit', env: process.env, detached: false});
    process.env.port = 2001;
    server2 = spawn('npm', ['run', 'start:simple'], {stdio: 'inherit', env: process.env, detached: false});
    await delay(2000);
    done();
  });

  afterEach(async done => {
    server.kill();
    server2.kill();
    await delay(2000);
    done();
  });

  test('we get back the blocks', async () => {
    const response = await fetch('http://localhost:2000/blocks');
    const chain = await response.json();

    expect(chain.length).toBe(1);
    expect(JSON.stringify(getGenesisBlock())).toBe(JSON.stringify(chain[0]));
  });

  test('we can mine a new block', async () => {
    await fetch('http://localhost:2000/mineBlock', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({a: 1})
    });
    const response = await fetch('http://localhost:2000/blocks');
    const chain = await response.json();

    expect(chain.length).toBe(2);
    expect(JSON.stringify(getGenesisBlock())).toBe(JSON.stringify(chain[0]));
    expect(getGenesisBlock().hash).toBe(chain[1].previousHash);
    expect(chain[1].data).toEqual({a: 1});
  });
});
