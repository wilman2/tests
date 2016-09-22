const assert = require('assert');
const parseSymbols = require('../../lib/file/parseSymbols');

describe('parse symbols', function () {
    it('should extract valid symbols', function () {
        const symbols = parseSymbols('GOOG\nAAPL');
        assert.deepEqual(symbols, ['GOOG', 'AAPL']);
    });

    it('should return empty array from empty content', function () {
        const symbols = parseSymbols('');
        assert.deepEqual(symbols, []);
    });

    it('should return empty array', function () {
        const symbols = parseSymbols(' ');
        assert.deepEqual(symbols, []);
    });



    //'AAPL \nGOOG\n\n  ' --> [GOOG]

});