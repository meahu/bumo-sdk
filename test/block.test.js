const BUMO = require('../lib/sdk.js');
const that = new BUMO({
    host: 'seed1.bumotest.io:26002',
});

async function getNumber () {
    const res = await that.block.getNumber();
    console.log(res);
}

async function getTransactions (blockNumber) {
    const res = await that.block.getTransactions();
    console.log(JSON.stringify(res));
}

async function getInfo (blockNumber) {
    const res = await that.block.getInfo(blockNumber);
    console.log(JSON.stringify(res));
}

getNumber();
getTransactions(2945358);
// getInfo(2945358);