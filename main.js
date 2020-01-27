const SHA256 = require('crypto-js/sha256');

class Block {
    /**
     * @param {number} timestamp 
     * @param {*} data 
     * @param {string} previousHash 
     */
    constructor(timestamp, data, previousHash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(`${this.previousHash}${this.timestamp}${JSON.stringify(this.data)}`).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGensisBlock()];
    }

    createGensisBlock() {
        return new Block("01/01/2020", "Genesis Block", null);
    }

    getLastestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let naiveCoin = new BlockChain();
naiveCoin.addBlock(new Block("10/12/2020", { amount: 10 }));
naiveCoin.addBlock(new Block("12/10/2020", { amount: 50 }));

console.log(JSON.stringify(naiveCoin, null, 4));
