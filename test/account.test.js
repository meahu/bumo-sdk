const Bumo = require('../lib/sdk.js');
const b = new Bumo({
    host: 'seed1.bumotest.io:26002',
});
console.log(b.account.create());