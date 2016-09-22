const assert = require('assert');
const fetchSymbols = require('../../lib/file/fetchSymbols');
const coMocha = require('co-mocha');

describe('fetch symbols', function () {
    it('reads file and parses symbols', function *() {

        //given
        var expectedAssertionCount = 0;

        const readFile = function(name) {
            expectedAssertionCount++;
            assert.equal(name, 'someFile');
            return Promise.resolve('file content');
        };
        const parseSymbols = function(fileContent) {
            expectedAssertionCount++;
            assert.equal(fileContent, 'file content');
            return ['A', 'B'];
        };

        const fetch = fetchSymbols({readFile, parseSymbols});

        //when
        const symbols = yield fetch('someFile');

        //then
        expectedAssertionCount++;
        assert.deepEqual(symbols, ['A', 'B']);
        assert.equal(expectedAssertionCount, 3, 'expected number of assertions');

        // fetch('someFile').then(function(symbols) {
        //     expectedAssertionCount++;
        //     assert.deepEqual(symbols, ['A', 'B']);
        //     assert.equal(expectedAssertionCount, 3, 'expected number of assertions');
        //     done();
        // }).catch(done);
    });
});