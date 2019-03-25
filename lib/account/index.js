const Utils = require('../Utils.js');
const { keypair } = require('bumo-encryption');

module.exports = class Account extends Utils {
    constructor (options) {
        super();
        if (!(this instanceof Account)) {
            return new Account(options);
        }
        this.options = options;
    }

    create () {
        const kp = keypair.getKeyPair();
        const privateKey = kp.encPrivateKey;
        const publicKey = kp.encPublicKey;
        const address = kp.address;
      
        return this._responseData({
            privateKey,
            publicKey,
            address,
        });
    };
}