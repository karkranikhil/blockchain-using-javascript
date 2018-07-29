const Blockchain = require('./blockchain')
const bitcoin = new Blockchain();

bitcoin.createNewBlock(1234, 'OINA797HJKKH', 'OINA797HJKKL');
bitcoin.createNewBlock(1235, 'OINA797HJKKJ', 'OINA797HJKKM');
bitcoin.createNewBlock(1236, 'OINA797HJKKK', 'OINA797HJKKN');
console.log(bitcoin);