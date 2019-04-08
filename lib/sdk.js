'use strict';

// const is = require('is-type-of');
// const Util = require('./util');
const Account = require('./account');
const Block = require('./blockchain/index.js');

module.exports = class Bumo {
    constructor (options) {
        if (!(this instanceof Bumo)) {
            return new Bumo(options);
        }
        this.options = options;
        this.account = new Account(this.options);
        this.block = new Block(this.options);
    }
};