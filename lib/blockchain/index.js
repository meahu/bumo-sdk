const Utils = require('../Utils.js');
const errors = require('../exception');
const { keypair } = require('bumo-encryption');

module.exports = class Block extends Utils {
    constructor (options) {
        super();
        if (!(this instanceof Block)) {
            return new Block(options);
        }
        this.options = options;
    }

    async getNumber () {
      try {
        return await this._getBlockNumber();
      } catch (err) {
        throw err;
      }
    };

    async getTransactions (blockNumber) {
      try {
        if (!this._verifyValue(blockNumber)) {
          return this._responseError(errors.INVALID_BLOCKNUMBER_ERROR);
        }
    
        const data = await this._request('get', 'getTransactionHistory', {
          ledger_seq: blockNumber,
        });
    
        if (data.error_code === 0) {
          return this._responseData(data.result);
        }
    
        if (data.error_code === 4) {
          return this._responseError(errors.QUERY_RESULT_NOT_EXIST, data.result);
        }
    
        return this._responseError(errors.FAIL);
    
      } catch (err) {
        throw err;
      }
    };

    async getInfo (blockNumber) {
      try {
        if (!this._verifyValue(blockNumber)) {
          return this._responseError(errors.INVALID_BLOCKNUMBER_ERROR);
        }
    
        const data = await this._request('get', 'getLedger', {
          seq: blockNumber,
        });
        if (data.error_code === 0) {
          let info = {};
    
          if (data.result && data.result.header) {
            const header = data.result.header;
            const closeTime = header.close_time || '';
            const number = header.seq;
            const txCount = header.tx_count || '';
            const version = header.version || '';
            info = {
              closeTime,
              number,
              txCount,
              version,
            }
          }
    
          return this._responseData(info);
        }
    
        if (data.error_code === 4) {
          return this._responseError(errors.QUERY_RESULT_NOT_EXIST, data.result);
        }
    
        return this._responseError(errors.FAIL);
    
      } catch (err) {
        throw err;
      }
    };
}