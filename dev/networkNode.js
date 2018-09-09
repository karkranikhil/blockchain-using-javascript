const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Blockchain = require('./blockchain')
const uuid = require('uuid/v1');
const rp = require('request-promise')
console.log(process.argv)
const port = process.argv[2]

const nodeAddress = uuid().split('-').join('')
const nikcoin = new Blockchain()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
// get entire blockchain
app.get('/blockchain', function (req, res) {
    res.send(nikcoin);
  });

// create a new transaction
app.post('/transaction', function(req, res) {
	const newTransaction = req.body;
	const blockIndex = nikcoin.addTransactionToPendingTransactions(newTransaction);
	res.json({ note: `Transaction will be added in block ${blockIndex}.` });
});
// broadcast transaction
app.post('/transaction/broadcast', function(req, res) {
	const newTransaction = nikcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
	nikcoin.addTransactionToPendingTransactions(newTransaction);

	const requestPromises = [];
	nikcoin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/transaction',
			method: 'POST',
			body: newTransaction,
			json: true
		};

		requestPromises.push(rp(requestOptions));
	});

	Promise.all(requestPromises)
	.then(data => {
		res.json({ note: 'Transaction created and broadcast successfully.' });
	});
});

//mine a block
app.get('/mine', function(req, res) {
	const lastBlock = nikcoin.getLastBlock();
	const previousBlockHash = lastBlock['hash'];
	const currentBlockData = {
		transactions: nikcoin.pendingTransactions,
		index: lastBlock['index'] + 1
	};
	const nonce = nikcoin.proofOfWork(previousBlockHash, currentBlockData);
	const blockHash = nikcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
	const newBlock = nikcoin.createNewBlock(nonce, previousBlockHash, blockHash);

	const requestPromises = [];
	nikcoin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/receive-new-block',
			method: 'POST',
			body: { newBlock: newBlock },
			json: true
		};

		requestPromises.push(rp(requestOptions));
	});

	Promise.all(requestPromises)
	.then(data => {
		const requestOptions = {
			uri: nikcoin.currentNodeUrl + '/transaction/broadcast',
			method: 'POST',
			body: {
				amount: 12.5,
				sender: "00",
				recipient: nodeAddress
			},
			json: true
		};

		return rp(requestOptions);
	})
	.then(data => {
		res.json({
			note: "New block mined & broadcast successfully",
			block: newBlock
		});
	});
});

app.post('/receive-new-block', function(req, res) {
	const newBlock = req.body.newBlock;
	const lastBlock = nikcoin.getLastBlock();
	const correctHash = lastBlock.hash === newBlock.previousBlockHash; 
	const correctIndex = lastBlock['index'] + 1 === newBlock['index'];

	if (correctHash && correctIndex) {
		nikcoin.chain.push(newBlock);
		nikcoin.pendingTransactions = [];
		res.json({
			note: 'New block received and accepted.',
			newBlock: newBlock
		});
	} else {
		res.json({
			note: 'New block rejected.',
			newBlock: newBlock
		});
	}
});



// register a node and broadcast it the network
app.post('/register-and-broadcast-node', function(req, res) {
	const newNodeUrl = req.body.newNodeUrl;
	if (nikcoin.networkNodes.indexOf(newNodeUrl) == -1) nikcoin.networkNodes.push(newNodeUrl);

	const regNodesPromises = [];
	nikcoin.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/register-node',
			method: 'POST',
			body: { newNodeUrl: newNodeUrl },
			json: true
		};

		regNodesPromises.push(rp(requestOptions));
	});

	Promise.all(regNodesPromises)
	.then(data => {
		const bulkRegisterOptions = {
			uri: newNodeUrl + '/register-nodes-bulk',
			method: 'POST',
			body: { allNetworkNodes: [ ...nikcoin.networkNodes, nikcoin.currentNodeUrl ] },
			json: true
		};

		return rp(bulkRegisterOptions);
	})
	.then(data => {
		res.json({ note: 'New node registered with network successfully.' });
	});
});

// register a node with the network
app.post('/register-node', function(req, res) {
	const newNodeUrl = req.body.newNodeUrl;
	const nodeNotAlreadyPresent = nikcoin.networkNodes.indexOf(newNodeUrl) == -1;
	const notCurrentNode = nikcoin.currentNodeUrl !== newNodeUrl;
	if (nodeNotAlreadyPresent && notCurrentNode) nikcoin.networkNodes.push(newNodeUrl);
	res.json({ note: 'New node registered successfully.' });
});

// register multiple nodes at once
app.post('/register-nodes-bulk', function(req, res) {
	const allNetworkNodes = req.body.allNetworkNodes;
	allNetworkNodes.forEach(networkNodeUrl => {
		const nodeNotAlreadyPresent = nikcoin.networkNodes.indexOf(networkNodeUrl) == -1;
		const notCurrentNode = nikcoin.currentNodeUrl !== networkNodeUrl;
		if (nodeNotAlreadyPresent && notCurrentNode) nikcoin.networkNodes.push(networkNodeUrl);
	});

	res.json({ note: 'Bulk registration successful.' });
});




app.listen(port, function(){
    console.log(`Listening on port ${port}...`)
})

