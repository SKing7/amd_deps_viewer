var transfer = require('./transfer');
var fs = require('fs');

module.exports = function (data, jsonFile, graphType, filterType) {
    data = transfer[graphType](data, filterType);
    fs.writeFileSync(jsonFile, JSON.stringify(data));
};
