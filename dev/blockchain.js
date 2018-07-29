function Blockchain(){
    this.chain = []; // here all block will store as a chain
    this.newTransactions=[]; // will put the new tranactions
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
    // this gonna be the block of our chain
    const newBlock = {
        index: this.chain.length+1, // describe the no of the block in the chain
        timestamp:Date.now(), // describe when this block got created
        transactions:this.newTransactions, // all the transaction of this block ( new+ waiting)
        nonce:nonce, //basically its a proof that we have created this block in a legimitate way by using proof of work method. it can be any number.
        hash:hash, // this hash will be the data of our new block. Actually we will pass our newTrnsaction in the hashing function
        previousBlockHash:previousBlockHash// this is smilar to our hash but of the previous block
    } 
    this.newTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
}

module.exports = Blockchain