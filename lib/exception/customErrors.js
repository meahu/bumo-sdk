'use strict';
// custom error code: from 15001 to 17000
module.exports = {
  ACCOUNT_NOT_EXIST: {
    CODE: 15001,
    MSG: 'Account not exist',
  },
  INVALID_NUMBER_OF_ARG: {
    CODE: 15006,
    MSG: 'Invalid number of arguments to the function',
  },
  QUERY_RESULT_NOT_EXIST: {
    CODE: 15014,
    MSG: 'Query result not exist',
  },
  INVALID_ARGUMENTS: {
    CODE: 15016,
    MSG: 'Invalid arguments to the function',
  },
  FAIL: {
    CODE: 15017,
    MSG: 'Fail',
  },
  INVALID_FORMAT_OF_ARG: {
    CODE: 15019,
    MSG: 'Invalid format of argument to the function',
  },
  INVALID_OPERATIONS: {
    CODE: 15022,
    MSG: 'Invalid operation',
  },
  INVALID_SIGNATURE_ERROR: {
    CODE: 15027,
    MSG: 'Invalid signature',
  },
  INVALID_METADATA_ERROR: {
    CODE: 15028,
    MSG: 'Invalid metadata',
  },
  INVALID_INPUT_ERROR: {
    CODE: 15028,
    MSG: 'Invalid input',
  },
  INVALID_DELETEFLAG_ERROR: {
    CODE: 15029,
    MSG: 'DeleteFlag must be a boolean',
  },
  INVALID_CONTRACT_BU_AMOUNT_ERROR: {
    CODE: 15030,
    MSG: 'BuAmount must between 0 and max(int64)',
  },
  INVALID_CONTRACT_ASSET_AMOUNT_ERROR: {
    CODE: 15031,
    MSG: 'AssetAmount must between 0 and max(int64)',
  },
};
