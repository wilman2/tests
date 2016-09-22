const assert = require("assert");
const readFile = require('../../lib/file/readFile');
const coMocha = require('co-mocha');
const fs = require('fs');

describe('read file', function () {
    it('[intergration testt] should get file content', function *() {
        const read = readFile({fs});

        const result = yield read('./symbols');
        
        assert.equal(result, 'GOOG\r\nAAPL\r\nORCL\r\nMSFT')
    });

    it('[intergration testt] should fail on non exist file', function *() {
        const read = readFile({fs});

        try {
            yield read('./symbols_invalid');
            throw 'should failed on nonexistent file';
        } catch(e) {
            assert.equal(e, 'Cannot read file ./symbols_invalid');
        }

    });

});