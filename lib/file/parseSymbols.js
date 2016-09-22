module.exports = function(rawData) {
   return rawData.split('\n').filter(itemFormat);
};

function itemFormat(item) {
    return item.trim().length > 0 && item.indexOf(' ') === -1;
};