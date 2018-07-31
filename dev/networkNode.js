const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Blockchain = require('./blockchain')
const uuid = require('uuid/v1');
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

// this will hit to create a new txn 
app.post('/transaction', function(req, res){
   const blockIndex = nikcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
   res.json({note:`Transaction will be added in block ${blockIndex}.`})
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
app.listen(port, function(){
    console.log(`Listening on port ${port}...`)
})

