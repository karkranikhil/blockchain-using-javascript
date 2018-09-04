const sha256 = require('sha256')
const currentNodeUrl = process.argv[3]
const uuid = require('uuid/v1');
function Blockchain(){
    this.chain = []; // here all block will store as a chain
    this.pendingTransactions=[]; // everytime a new trxn created it push to this.But this is not recorder into blockchain. it will record when a new block is mined/created . its an pending tnx and not validated yet. it will recorder whenwe create new block
    this.currentNodeUrl = currentNodeUrl
    this.networkNodes = []
    this.createNewBlock(0, '0', '0') // geneisis block
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
    // this gonna be the block of our chain
    const newBlock = {
        index: this.chain.length+1, // describe the no of the block in the chain
        timestamp:Date.now(), // describe when this block got created
        transactions:this.pendingTransactions, // all the transaction of this block ( new+ waiting)
        nonce:nonce, //basically its a proof that we have created this block in a legimitate way by using proof of work method. it can be any number.
        hash:hash, // this hash will be the data of our new block. Actually we will pass our newTrnsaction in the hashing function
        previousBlockHash:previousBlockHash// this is smilar to our hash but of the previous block
    } 
    this.pendingTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
}
Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length-1];
}

Blockchain.prototype.createNewTransaction= function(amount, sender, recipient){
    const newTransaction = {
        transactionId:uuid().split('-').join(''),
        amount:amount,
        sender:sender,
        recipient:recipient
    }
    return newTransaction
}
Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj){
    this.pendingTransactions.push(transactionObj)
    return this.getLastBlock()['index']+1 // return no of bloks this trnx added to
}

//it take block from block chain and hash that to fixed length string that is pretty much random
Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
    const hash = sha256(dataAsString)
    return hash
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
    let nonce = 0
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while(hash.substring(0,4) !== '0000'){
        nonce++;
        hash = this.hashBlock(previousBlockHash,currentBlockData, nonce);
    }
    return nonce
}
module.exports = Blockchain