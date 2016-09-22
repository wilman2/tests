const assert = require("assert");
const readFile = require('../../lib/file/readFile');
const coMocha = require('co-mocha');

describe('read file', function () {
    it('[intergration testt] should get file content', function *() {
        const read = readFile();

        const result = yield read('./symbols');
        
        assert.equal(result, 'GOOG\r\nAAPL\r\nORCL\r\nMSFT')
    });

});