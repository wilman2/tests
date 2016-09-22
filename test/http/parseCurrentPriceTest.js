const assert = require('assert');
const parseCurrentPrices = require('../../lib/http/parseCurrentPrices');
const Either = require('data.either');

describe('parse current prices', function () {
    it('should extract data from 200 response', function () {
        const data = "Date,Open,High,Low,Close,Volume,Adj Close\n\ 2015-09-11,619.75,625.780029,617.419983,625.77002,1360900,625.77002\n\ 2015-09-10,613.099976,624.159973,611.429993,621.349976,1900500,621.349976";

        const response = {
            statusCode: 200,
            body: data
        };

        const prices = parseCurrentPrices([response]);

        assert.deepEqual(prices, [Either.Right('619.75')]);
    });

    it('should handle error reponse', function () {
        const response = {
            statusCode: 404
        };

        const prices = parseCurrentPrices([response]);

        assert.deepEqual(prices, [Either.Left(404)]);
    });
});