const assert = require("assert");
const readFile = require('../../lib/file/readFile');
const coMocha = require('co-mocha');
const td = require('testdouble');

describe('read file', function () {
    it('[intergration test] should get file content', function *() {
        //given
        const fs = require('fs');
        const read = readFile({fs});

        //when
        const result = yield read('./symbols');

        //then
        assert.equal(result, 'GOOG\r\nAAPL\r\nORCL\r\nMSFT')
    });

    if('[unit test] should get file content', function *() {
        //given
        const fs = {
            readFile: function(fileName, encoding, callback) {
                assert.equal(fileName, './symbols');
                assert.equal(encoding, 'utf-8');
                callback(null, 'content');
            }
        };

        //when
        const read = readFile({fs});

        //then
        const result = yield read('./symbols');
        assert.equal(result, 'content');

    });

    if('[unit test with mocking library] should get file content', function *() {
            //given
            const fs = td.object();
            td.when(fs.readFile('./symbols'), 'utf-8').thenCallback(null, 'content');

            //when
            const read = readFile({fs});

            //then
            const result = yield read('./symbols');
            assert.equal(result, 'content');

        });

    it('[intergration testt] should fail on non exist file', function *() {
        const fs = require('fs');
        const read = readFile({fs});

        try {
            yield read('./symbols_invalid');
            throw 'should failed on nonexistent file';
        } catch(e) {
            assert.equal(e, 'Cannot read file ./symbols_invalid');
        }

    });

    it('[parsertest] should return GOOGnAPPL --> [GOOG, APPL]', function *() {
        //given
        const input = 'GOOG\nAPPL';
        
        const fs = require('fs');
        const read = readFile({fs});

        //when
        const result = yield read('./symbols');

        //then
        assert.equal(result, 'GOOG\r\nAAPL\r\nORCL\r\nMSFT')
    });


});