module.exports = class Utils {
    constructor () {

    }
    _responseData (data) {
        const errorCode = 0;
        const errorDesc = '';
        return {
            errorCode,
            errorDesc,
            result: data
        }
    };
}