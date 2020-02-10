const SHA256 = require('crypto-js/sha256');

class Block {
    /**
     * @param {number} timestamp 
     * @param {*} data 
     * @param {string} previousHash 
    **/
    constructor(timestamp, data, previousHash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) != Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(`Block mind: {this.hash}`);
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGensisBlock()];
        this.difficulty = 2;
    }

    createGensisBlock() {
        return new Block("01/01/2020", "Genesis Block", null);
    }

    getLastestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (currBlock.hash !== currBlock.calculateHash()) {
                return false;
            }

            if (currBlock.previousHash !== prevBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let naiveCoin = new BlockChain();

let start = Date.now();
console.log(`Mining block 1 ... ${start}`);
naiveCoin.addBlock(new Block("10/12/2020", { amount: 10 }));
console.log(`Done block 1 ... ${Date.now() - start} ms`);
console.log('');

start = Date.now();
console.log(`Mining block 2 ... ${start}`);
naiveCoin.addBlock(new Block("12/10/2020", { amount: 50 }));
console.log(`Done block 2 ... ${Date.now() - start} ms`);
console.log('');

console.log(JSON.stringify(naiveCoin, null, 2));
