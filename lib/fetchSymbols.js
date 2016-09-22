module.exports = function({readFile, parseSymbols}) {
    return function(fileName) {
        return readFile(fileName).then(function(fileContent) {
            return parseSymbols(fileContent);
        });
    }
};