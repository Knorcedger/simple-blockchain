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

  test('we can add a peer, and chains sync', async () => {
    await fetch('http://localhost:2000/mineBlock', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({a: 1})
    });
    await fetch('http://localhost:2000/addPeer', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({peer: 'ws://localhost:2001'})
    });

    await delay(2000);

    const responsePeers1 = await fetch('http://localhost:2000/peers');
    const peers1 = await responsePeers1.json();
    expect(peers1.length).toBe(1);
    expect(peers1[0]).toBe('127.0.0.1:2001');

    const responsePeers2 = await fetch('http://localhost:2001/peers');
    const peers2 = await responsePeers2.json();
    expect(peers2.length).toBe(1);
    expect(peers2[0].startsWith('::ffff:127.0.0.1:')).toBeTruthy();

    const responseBlocks = await fetch('http://localhost:2001/blocks');
    const chain = await responseBlocks.json();
    expect(chain.length).toBe(2);
    expect(JSON.stringify(getGenesisBlock())).toBe(JSON.stringify(chain[0]));
    expect(getGenesisBlock().hash).toBe(chain[1].previousHash);
    expect(chain[1].data).toEqual({a: 1});
  });
});
