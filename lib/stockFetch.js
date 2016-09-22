module.exports = function(args) {

    const fetchSymbols = args.fetchSymbols;
    const fetchPrices = args.fetchPrices;
    const prepareReport = args.prepareReport;

    return function (fileName) {
        return fetchSymbols(fileName).then(fetchPrices).then(prepareReport);
    };
};