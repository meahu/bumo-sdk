const Utils = require('../Utils.js');
const errors = require('../exception');
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

    /**
     * Check address
     * @param {String} address
     * @return {Boolean}
     */
    checkValid (address) {
        const isValid = keypair.checkAddress(address);
        return this._responseData({
            isValid,
        });
    };
    
    /**
     * Get account information
     * @param  {String} address
     * @return {Object}
     */
    async getInfo (address) {
        if (!keypair.checkAddress(address)) {
            return this._responseError(errors.INVALID_ADDRESS_ERROR);
        }
    
        const res = await this._request('get', 'getAccount', { address });
        if (res.error_code !== 0) {
            return this._responseError(errors.ACCOUNT_NOT_EXIST);
        }
    
        let nonce =  res.result.nonce;
    
        nonce = nonce ? nonce : '0';
        return this._responseData({
            address: res.result.address,
            balance: res.result.balance,
            nonce: nonce,
            assets: res.result.assets || [],
            priv: res.result.priv || {},
        });
    };

    async getBalance (address) {
        if (!keypair.checkAddress(address)) {
          return this._responseError(errors.INVALID_ADDRESS_ERROR);
        }
      
        let info = await this.getInfo(address);
      
        if (info.errorCode === 0) {
          return this._responseData({
            balance: info.result.balance,
          });
        }
      
        return this._responseError(errors.ACCOUNT_NOT_EXIST);
    };

    async getNonce (address) {
        if (!keypair.checkAddress(address)) {
          return this._responseError(errors.INVALID_ADDRESS_ERROR);
        }
      
        let info = await this.getInfo(address);
      
        if (info.errorCode === 0) {
          return this._responseData({
            nonce: info.result.nonce,
          });
        }
      
        return this._responseError(errors.ACCOUNT_NOT_EXIST);
    };

    async getAssets (address) {
        if (!keypair.checkAddress(address)) {
          return this._responseError(errors.INVALID_ADDRESS_ERROR);
        }
      
        let info = await this.getInfo(address);
      
        if (info.errorCode === 0) {
          return this._responseData({
            assets: info.result.assets,
          });
        }
      
        return this._responseError(errors.ACCOUNT_NOT_EXIST);
    };
}