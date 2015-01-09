var argv = require('optimist').argv;
var out = require('./lib/out');
var deps = require('./lib/deps');

var sourceDir = argv.d;
var outfile = argv.o || './deps.json';
var graphType = argv.g || 'dfl';
var filterType = argv.f || 'autonavi';

deps.walker({
    dist: sourceDir,
}, function (data) {
    out(data, outfile, graphType, filterType);
});
