const request = require('request-promise');
const JSONbig = require('json-bigint');
const { keypair } = require('bumo-encryption');

module.exports = class Utils {

    constructor () {}

    _responseData (data) {
        const errorCode = 0;
        const errorDesc = '';
        return {
            errorCode,
            errorDesc,
            result: data
        }
    };

    _responseError (message) {
        if (!message) {
            throw new Error('require message');
        }
        const errorCode = message.CODE;
      
        return {
            errorCode,
            errorDesc: message.MSG,
        };
    };

    /**
     * GET/POST request
     *
     * @param  {String} method
     * @param  {String} path
     * @param  {Object} data
     * @return {Object}
     */
    async _request (method, path, data = {}) {
        try {
            const protocol = this.options.secure ? 'https://' : 'http://';
            const uri = `${protocol}${this.options.host}/${path}`;
        
            // if (!is.string(method) || this._isEmptyString(method)) {
            //     throw new Error('method must be a non-empty string');
            // }
        
            // if (!is.string(path) || this._isEmptyString(path)) {
            //     throw new Error('path must be a non-empty string');
            // }
        
            const methods = [ 'get', 'post' ];
        
            if (!methods.includes(method.toLowerCase())) {
                throw new Error(`${method} http method is not supported`);
            }
        
            const options = {
                method,
                uri,
        
            };
        
            if (method === 'get') {
                options.qs = data;
            }
        
            if (method === 'post') {
                options.body = data;
            }
            const result = await request(options);
            const obj = JSONbig.parse(result);
            const error_code = obj.error_code;
            const final =  this._bigNumberToString(obj);
            final.error_code = error_code;
            return final;
        } catch (err) {
            throw err;
        }
    };

    _bigNumberToString (obj, base) {
        // setup base
        base = base || 10;
      
        // check if obj is type object, not an array and does not have BN properties
        if (typeof obj === 'object' && obj !== null && !Array.isArray(obj) && !('lessThan' in obj)) {
          // move through plain object
          Object.keys(obj).forEach(key => {
            // recurively converty item
            obj[key] = this._bigNumberToString(obj[key], base);
          })
        }
      
        // obj is an array
        if (Array.isArray(obj)) {
          // convert items in array
          obj = obj.map(item => {
            // convert item to a string if bignumber
            return this._bigNumberToString(item, base);
          })
        }
      
        // if obj is number, convert to string
        if (typeof obj === 'number') return obj + '';
      
        // if not an object bypass
        if (typeof obj !== 'object' || obj === null) return obj;
      
        // if the object to does not have BigNumber properties, bypass
        if (!('toString' in obj) || !('lessThan' in obj)) return obj;
      
        // if object has bignumber properties, convert to string with base
        return obj.toString(base);
    };

    async _getBlockNumber () {
        try {
          const data = await this._request('get', 'getLedger');
          if (data && data.error_code === 0) {
            const seq = data.result.header.seq;
            return this._responseData({
              header: {
                blockNumber: seq,
              },
            });
          } else {
            return this._responseError(errors.INTERNAL_ERROR);
          }
        } catch (err) {
          throw err;
        }
      };

    async _verifyValue (str) {
      const reg = /^[1-9]\d*$/;
      return (
          is.string(str) &&
          reg.test(str) &&
          long.fromValue(str).greaterThan(0) &&
          long.fromValue(str).lessThanOrEqual(long.MAX_VALUE)
      );
    };
}