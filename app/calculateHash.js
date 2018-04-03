import crypto from 'crypto';

const calculateHash = (index, previousHash, timestamp, data) => {
  return crypto.createHash('sha256').update(index + previousHash + timestamp + data).digest('hex');
};

export default calculateHash;
