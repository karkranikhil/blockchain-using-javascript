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
// this will send us back whole blockchain
app.get('/blockchain', function(req, res){
    res.send(nikcoin)
})

// create new txn
app.post('/transaction', function(req, res){
    const newTransaction = req.body;
    const blockIndex = nikcoin.addTransactionToPendingTransactions(newTransaction)
    res.json({note:`Transaction will be added in block ${blockIndex}.`})
})
app.post('/transaction/broadcast', function(req,res){
    const newTransaction = nikcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient)
    nikcoin.addTransactionToPendingTransactions(newTransaction)
    const requestPromises = [];

    nikcoin.networkNodes.forEach(networkNodeUrl=>{
        const requestOptions = {
            uri:networkNodeUrl+'/transaction',
            method:'POST',
            body:newTransaction,
            json:true
        }
        requestPromises.push(rp(requestOptions))
    });
    Promise.all(requestPromises)
    .then(data=>{
        res.json({note:'Transaction created and broadcast successfully.'})
    })
})

//
app.get('/mine', function(req, res){
    const lastBlock = nikcoin.getLastBlock()
    const prevBlockHash = lastBlock['hash']
    const currentBlockData = {
        transactions:nikcoin.pendingTransactions,
        index:lastBlock['index']
    }
    const nonce = nikcoin.proofOfWork(prevBlockHash, currentBlockData)
    const blockHash = nikcoin.hashBlock(prevBlockHash, currentBlockData, nonce)

    // reward for the mining is 12.5  from sender address 00
    nikcoin.createNewTransaction(12.5,"00",nodeAddress)
    const newBlock = nikcoin.createNewBlock(nonce, prevBlockHash, blockHash)
    res.json({
        note:'New block mined successfully',
        block:newBlock
    })
})

//register a node and broadcast to the entire network
app.post('/register-and-broadcast-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl
    if(nikcoin.networkNodes.indexOf(newNodeUrl) == -1){
        nikcoin.networkNodes.push(newNodeUrl)
    }
    const regNodesPromises=[]
    nikcoin.networkNodes.forEach((networkNodeUrl)=>{
        const requestOptions = {
            uri:networkNodeUrl +'/register-node',
            method:'POST',
            body:{
                newNodeUrl:newNodeUrl
            },
            json:true
        }
        regNodesPromises.push(rp(requestOptions))
    })
    Promise.all(regNodesPromises).then(data=>{
        const bulRegisterOptions ={
            uri:newNodeUrl+'/register-nodes-bulk',
            method:'POST',
            body:{allNetworkNodes:[...nikcoin.networkNodes, nikcoin.currentNodeUrl]},
            json:true
        }
        return rp(bulRegisterOptions)
    }).then(data=>{
        res.json({note:'New node register with network successfully'})
    })
})

// register a node with the network
app.post('/register-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = nikcoin.networkNodes.indexOf(newNodeUrl) === -1
    const notCurrentNode = nikcoin.currentNodeUrl !== newNodeUrl

    if(nodeNotAlreadyPresent && notCurrentNode){
        nikcoin.networkNodes.push(newNodeUrl)
    }
    res.json({
        note:'New node registered successfully with node.'
    })
})

// register multipe node at once
app.post('/register-nodes-bulk', function(req, res){
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl=>{
        const nodeNotAllReadyPresent = nikcoin.networkNodes.indexOf(networkNodeUrl)=== -1;
        const notCurrentNode = nikcoin.currentNodeUrl !==networkNodeUrl
        if(nodeNotAllReadyPresent && notCurrentNode){
            nikcoin.networkNodes.push(networkNodeUrl);
        }
    });
    res.json({note:'Bulk registration successful.'})
})




app.listen(port, function(){
    console.log(`Listening on port ${port}...`)
})

