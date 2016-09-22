const assert = require('assert');
const fetchPrices = require('../../lib/http/fetchPrices');
const coMocha = require('co-mocha');

describe('fetch prices', function () {
    it('should return prices for symbols', function *() {
        let expectedAssertionCount = 0;

        const readAllPrices = function(symbols) {
            expectedAssertionCount++;
            assert.deepEqual(symbols, ['A', 'B']);
            return Promise.resolve(['responseA', 'responseB']);
        };

        const parseCurrentPrices = function(responses) {
            expectedAssertionCount++;
            assert.deepEqual(responses, ['responseA', 'responseB']);
            return [10, 20];
        };

        const fetch = fetchPrices({readAllPrices, parseCurrentPrices});

        const result = yield fetch(['A', 'B']);
        expectedAssertionCount++;

        assert.deepEqual(result, [['A', 10], ['B', 20]]);
        assert.equal(expectedAssertionCount, 3, 'expected number of assertions');
    });
});