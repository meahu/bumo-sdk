const Bumo = require('../lib/sdk.js');
const b = new Bumo({
    host: 'seed1.bumotest.io:26002',
});
let account = b.account.create();
console.log(b.account.checkValid(account.result.address));
console.log(b.account.getInfo(account.result.address));