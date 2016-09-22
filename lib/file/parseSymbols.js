module.exports = function(rawData) {
   return rawData.split('\n').filter(function(item) {
       return item.length > 0;
   });
};