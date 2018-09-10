const sha256 = require('sha256')
const currentNodeUrl = process.argv[3]
const uuid = require('uuid/v1');
function Blockchain(){
    this.chain = []; // here all block will store as a chain
    this.pendingTransactions=[]; // everytime a new trxn created it push to this.But this is not recorder into blockchain. it will record when a new block is mined/created . its an pending tnx and not validated yet. it will recorder whenwe create new block
    this.currentNodeUrl = currentNodeUrl
    this.networkNodes = []
    this.createNewBlock(100, '0', '0') // geneisis block
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
    return this.getLastBlock()['index']+1 // return no of blocks this trnx added to
}



//it take block from block chain and hash that to fixed length string that is pretty much random
Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
    //console.log(previousBlockHash, currentBlockData, nonce)
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
    const hash = sha256(dataAsString)
   // console.log('hash', hash)
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
// it tell whether this block is valid or not 
//We're going to use this chain as valid method to validate the other chains inside of our network when
Blockchain.prototype.chainIsValid = function(blockchain){
    let validChain = true
    // skipping genesis block thats whay starting loop with 1
    for(let i = 1; i < blockchain.length; i++){
        //console.log(blockchain[i])
        const currentBlock = blockchain[i]
        const prevBlock = blockchain[i-1]
        const blockHash = this.hashBlock(prevBlock['hash'],{transactions:currentBlock['transactions'], index:currentBlock['index']}, currentBlock['nonce'])
        console.log('blockHash', blockHash)
        //we are hashing every block and making sure block hash start with 4 zeros
        if(blockHash.substring(0,4) !== '0000'){
            console.log('failed at hash 0000')
            validChain = false
        }
        // checking all of the hashes align properly
        if(currentBlock['previousBlockHash'] !== prevBlock['hash']){
            console.log('failed at hash prev and currentprev hash ')
            validChain = false // chain not valid
        } 
    }
    // checking genesisBlock
    const genesisBlock = blockchain[0]
    console.log(genesisBlock)
    const correctNonce = genesisBlock['nonce'] === 100
    const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0'
    const correctHash = genesisBlock['hash'] === '0'
    const correctTransactions = genesisBlock['transactions'].length === 0
    console.log(correctNonce, correctPreviousBlockHash, correctHash, correctTransactions)
    if(!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions){
        console.log('failed at genesis block')
        validChain = false
    }
    return validChain
}
// consensus
app.get('/consensus', function(req, res) {
	const requestPromises = [];
	nikcoin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/blockchain',
			method: 'GET',
			json: true
		};

		requestPromises.push(rp(requestOptions));
	});

	Promise.all(requestPromises)
	.then(blockchains => {
		const currentChainLength = nikcoin.chain.length;
		let maxChainLength = currentChainLength;
		let newLongestChain = null;
		let newPendingTransactions = null;

		blockchains.forEach(blockchain => {
			if (blockchain.chain.length > maxChainLength) {
				maxChainLength = blockchain.chain.length;
				newLongestChain = blockchain.chain;
				newPendingTransactions = blockchain.pendingTransactions;
			};
		});


		if (!newLongestChain || (newLongestChain && !nikcoin.chainIsValid(newLongestChain))) {
			res.json({
				note: 'Current chain has not been replaced.',
				chain: nikcoin.chain
			});
		}
		else {
			nikcoin.chain = newLongestChain;
			nikcoin.pendingTransactions = newPendingTransactions;
			res.json({
				note: 'This chain has been replaced.',
				chain: nikcoin.chain
			});
		}
	});
});

Blockchain.prototype.getBlock = function(blockHash) {
	let correctBlock = null;
	this.chain.forEach(block => {
		if (block.hash === blockHash) correctBlock = block;
	});
	return correctBlock;
};


Blockchain.prototype.getTransaction = function(transactionId) {
	let correctTransaction = null;
	let correctBlock = null;

	this.chain.forEach(block => {
		block.transactions.forEach(transaction => {
			if (transaction.transactionId === transactionId) {
				correctTransaction = transaction;
				correctBlock = block;
			};
		});
	});

	return {
		transaction: correctTransaction,
		block: correctBlock
	};
};


Blockchain.prototype.getAddressData = function(address) {
	const addressTransactions = [];
	this.chain.forEach(block => {
		block.transactions.forEach(transaction => {
			if(transaction.sender === address || transaction.recipient === address) {
				addressTransactions.push(transaction);
			};
		});
	});

	let balance = 0;
	addressTransactions.forEach(transaction => {
		if (transaction.recipient === address) balance += transaction.amount;
		else if (transaction.sender === address) balance -= transaction.amount;
	});

	return {
		addressTransactions: addressTransactions,
		addressBalance: balance
	};
};

module.exports = Blockchain