const Blockchain = require('./blockchain')
const nikcoin = new Blockchain();
// const previousBlockHash = 'prev123456'
// const currentBlockData = [
//     {   amount: 100,
//         sender: 'JOHN897JHKKJH',
//         recipient: 'JULIA897JHOIUOI' 
//     },
//     {   amount: 200,
//         sender: 'JOHNNY897JHKKJH',
//         recipient: 'JULIAAA897JHOIUOI' 
//     },
//     {   amount: 300,
//         sender: 'NIK897JHKKJH',
//         recipient: 'SID897JHOIUOI' 
//     }]
    
//const nonce = 11680
//console.log(nikcoin.hashBlock(previousBlockHash, currentBlockData, nonce))
//console.log(nikcoin.proofOfWork(previousBlockHash, currentBlockData))

//const nonce = 100;

// console.log(nikcoin.hashBlock(previousBlockHash, currentBlockData, nonce))
// nikcoin.createNewBlock(1234, 'OINA797HJKKH', 'OINA797HJKKL');
// nikcoin.createNewTransaction(100, 'JOHNH897JHKKJH', 'JULIAH897JHOIUOI')

 //nikcoin.createNewBlock(123477, 'OINA797HJKLLL', 'OINA797HJKMMM');
// nikcoin.createNewTransaction(200, 'JOHNH897JHKKJG', 'JULIAH897JHOIUOE')
// nikcoin.createNewTransaction(300, 'JOHNH897JHKKJF', 'JULIAH897JHOIUOS')
// nikcoin.createNewTransaction(400, 'JOHNH897JHKKJD', 'JULIAH897JHOIUOA')
// nikcoin.createNewBlock(123477, 'OINA797HJeLLL', 'OINA797HJwMMM');
//console.log(nikcoin);
// console.log(nikcoin.chain[1]);
// console.log(nikcoin.chain[2]);
//const nonce =100
//console.log(nikcoin.createNewBlock(1234, 'OINA797HJKKH', 'OINA797HJKKL'))
//console.log(nikcoin.hashBlock(previousBlockHash, currentBlockData, nonce))
// const nonce = 11680
// console.log(nikcoin.hashBlock(previousBlockHash, currentBlockData, nonce))
//console.log(nikcoin.proofOfWork(previousBlockHash, currentBlockData))

const bc1 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1536473184500,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1536473211762,
    "transactions": [],
    "nonce": 18140,
    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1536473402488,
    "transactions": [
    {
    "transactionId": "8b755790b3f611e8a32b2b333ded0dbc",
    "amount": 12.5,
    "sender": "00",
    "recipient": "7b31fb40b3f611e8a32b2b333ded0dbc"
    },
    {
    "transactionId": "e52c1bc0b3f611e8a32b2b333ded0dbc",
    "amount": 70,
    "sender": "NIKHILKARKRA6876786",
    "recipient": "SIDKARKRA6876786"
    },
    {
    "transactionId": "f735b920b3f611e8a32b2b333ded0dbc",
    "amount": 90,
    "sender": "NIKHILKARKRA68767863",
    "recipient": "SIDKARKRA68767863"
    }
    ],
    "nonce": 2555,
    "hash": "000016c32e757b620cd2269bac6de093772f105c7543cb8272eb41c27a629916",
    "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    }
    ],
    "pendingTransactions": [
    {
    "transactionId": "fd20c4b0b3f611e8a32b2b333ded0dbc",
    "amount": 12.5,
    "sender": "00",
    "recipient": "7b31fb40b3f611e8a32b2b333ded0dbc"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }

        //nikcoin.chainIsValid(bc1.chain)
        var a = "0"
        var b  = {transactions:[], index:2}
       var c = 53901
        // console.log(nikcoin.proofOfWork(a, b))
        console.log(nikcoin.hashBlock(a, b, c)) 
        console.log('Valid', nikcoin.chainIsValid(bc1.chain))