const Blockchain = require('./blockchain')
const bitcoin = new Blockchain();
const previousBlockHash = 'prev123456'
const currentBlockData = [
    {   amount: 100,
        sender: 'JOHN897JHKKJH',
        recipient: 'JULIA897JHOIUOI' 
    },
    {   amount: 200,
        sender: 'JOHNNY897JHKKJH',
        recipient: 'JULIAAA897JHOIUOI' 
    },
    {   amount: 300,
        sender: 'NIK897JHKKJH',
        recipient: 'SID897JHOIUOI' 
    }]
    const nonce = 100;
console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce))
// bitcoin.createNewBlock(1234, 'OINA797HJKKH', 'OINA797HJKKL');
// bitcoin.createNewTransaction(100, 'JOHNH897JHKKJH', 'JULIAH897JHOIUOI')

// bitcoin.createNewBlock(123477, 'OINA797HJKLLL', 'OINA797HJKMMM');
// bitcoin.createNewTransaction(200, 'JOHNH897JHKKJG', 'JULIAH897JHOIUOE')
// bitcoin.createNewTransaction(300, 'JOHNH897JHKKJF', 'JULIAH897JHOIUOS')
// bitcoin.createNewTransaction(400, 'JOHNH897JHKKJD', 'JULIAH897JHOIUOA')
// bitcoin.createNewBlock(123477, 'OINA797HJeLLL', 'OINA797HJwMMM');
// console.log(bitcoin);
// console.log(bitcoin.chain[1]);
// console.log(bitcoin.chain[2]);