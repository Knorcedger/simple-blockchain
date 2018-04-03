/**
 * Defines a block
 */
class Block {
  /**
   * The block constructor
   * @param {number} index        The block index
   * @param {string} previousHash The previous block hash
   * @param {number} timestamp    The block timestamp
   * @param {string} data         The block data
   * @param {string} hash         The block hash
   */
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index;
    this.previousHash = previousHash.toString();
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash.toString();
  }
}

export default Block;
