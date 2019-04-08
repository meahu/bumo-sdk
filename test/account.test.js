require('chai').should();

const Bumo = require('../lib/sdk.js');
const that = new Bumo({
    host: 'seed1.bumotest.io:26002',
});

// let account = b.account.create();
// console.log(b.account.checkValid(account.result.address));
// console.log(b.account.getInfo(account.result.address));

async function create() {
    const keypair = await that.account.create();
    console.log(keypair);
}

async function getInfo() {
    const keypair = await that.account.getInfo('buQdtUTWsapoaWQYQc6MiUNXNk4Wid3n1z8T');
    console.log(JSON.stringify(keypair));
}

async function getNonce() {
    const keypair = await that.account.getNonce('buQdtUTWsapoaWQYQc6MiUNXNk4Wid3n1z8T');
    console.log(JSON.stringify(keypair));
}

async function getAssets() {
    const keypair = await that.account.getAssets('buQdtUTWsapoaWQYQc6MiUNXNk4Wid3n1z8T');
    console.log(JSON.stringify(keypair));
}

// create();
// getInfo();
// getNonce();
getAssets();

// describe('Test bumo-sdk account service', function() {
//     it ('测试 account.create()', async() => {
//         const keypair = await that.account.create();
//         keypair.errorCode.should.equal(0);
//         keypair.result.should.be.a('object');
//         keypair.result.should.have.property('privateKey').with.lengthOf(56);
//         keypair.result.should.have.property('publicKey').with.lengthOf(76);
//         keypair.result.should.have.property('address').with.lengthOf(36);
//     })
// });