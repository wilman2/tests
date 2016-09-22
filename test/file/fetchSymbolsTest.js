const assert = require('assert');
const fetchSymbols = require('../../lib/file/fetchSymbols');
const coMocha = require('co-mocha');
const td = require('testdouble');

describe('fetch symbols', function () {
    it('[mocking library] reads file and parses symbols', function *() {
        //given
        const readFile = td.function('readFile');
        td.when(readFile('someFile')).thenReturn(Promise.resolve('file content'));
        const parseSymbols = td.function('parseSymbols');
        td.when(parseSymbols('file content')).thenReturn(['A','B']);

        const fetch = fetchSymbols({readFile, parseSymbols});

        //when
        const symbols = yield fetch('someFile');

        //then
        // td.verify(readFile('someFile'));
        // td.verify(parseSymbols('file content'));
        assert.deepEqual(symbols, ['A', 'B']);
    });

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
        
    });
});