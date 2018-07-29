const Blockchain = require('./blockchain')
const bitcoin = new Blockchain();

bitcoin.createNewBlock(1234, 'OINA797HJKKH', 'OINA797HJKKL');
bitcoin.createNewTransaction(100, 'JOHNH897JHKKJH', 'JULIAH897JHOIUOI')

bitcoin.createNewBlock(123477, 'OINA797HJKLLL', 'OINA797HJKMMM');
bitcoin.createNewTransaction(200, 'JOHNH897JHKKJG', 'JULIAH897JHOIUOE')
bitcoin.createNewTransaction(300, 'JOHNH897JHKKJF', 'JULIAH897JHOIUOS')
bitcoin.createNewTransaction(400, 'JOHNH897JHKKJD', 'JULIAH897JHOIUOA')
bitcoin.createNewBlock(123477, 'OINA797HJeLLL', 'OINA797HJwMMM');
console.log(bitcoin);
console.log(bitcoin.chain[1]);
console.log(bitcoin.chain[2]);