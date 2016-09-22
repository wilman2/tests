const assert = require('assert');
const readAllPrices = require('../../lib/http/readAllPrices');
const coMocha = require('co-mocha');

describe('read all prices', function () {
    it.skip('[integration test] should make symbol requests', function *() {
        const request = require('good-guy-http')();
        const read = readAllPrices({request});

        const results = yield read(['AAPL', 'GOOG', 'INVALID']);

        assert.equal(results[0].statusCode, 200);
        assert.equal(results[1].statusCode, 200);
        assert.equal(results[2].statusCode, 404);
        assert.equal(results.length, 3);
    });

    it('[unit test] should make symbol requests', function *() {
        // const request = require('good-guy-http')();
        const request = function(url) {
            return url.endsWith('INVALID') ?
                Promise.reject({statusCode: 404}) :
                Promise.reject({statusCode: 200});
        };

        const read = readAllPrices({request});

        const results = yield read(['AAPL', 'GOOG', 'INVALID']);

        assert.equal(results[0].statusCode, 200);
        assert.equal(results[1].statusCode, 200);
        assert.equal(results[2].statusCode, 404);
        assert.equal(results.length, 3);
    });
});