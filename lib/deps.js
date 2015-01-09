var esprima = require('esprima');
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var recursive = require('recursive-readdir');
var allDeps = {};
var counter = 0;

module.exports = {
    walker: function (opt, cb) {
        var opt = opt || {};
        var parsedTree;
        if (!opt.dist) {
            return onError('目标文件不存在');
        }
        eachJsFile(opt.dist, function (data, index, size) {
            parsedTree = esprima.parse(data);
            walk(parsedTree);
            if (index === size - 1) {
                cb(allDeps);
            }
        });
    },
};
function eachJsFile(dir, fn) {
    recursive(dir, function (err, files) {
        for (var i = 0; i < files.length; i++) {
            ~function (fname, index) {
                if (path.extname(fname) !== '.js') return;
                fs.readFile(fname, function (err, data) {
                    fn(data, index, files.length);
                });
            }(files[i], i);
        }
    });
}
/*
 * 处理define和require表达式 */
function walk(obj) {
    var body = obj.body; 
    var expression; 
    var calleeName;
    _.forEach(body, function (v) {
        if (v && v.type === 'ExpressionStatement') {
            expression = v.expression;
            if (expression && expression.type === 'CallExpression') {
                calleeName = expression.callee.name;
                if (calleeName === 'define') {
                    handle(expression.arguments);
                } else if (calleeName === 'require'){
                    handle(expression.arguments);
                }
            }
        } else if (v.type === 'FunctionDeclaration'){
            if (v.body && v.body.type === 'BlockStatement') {
                walk(v.body);
            }
        }
    });
}
/**
 * 处理require，define的参数，得到依赖关系*/
function handle(args) {
    var definedModule;
    var deps;
    _.forEach(args, function (v) {
        if (v.type === 'Literal') {
            definedModule = v.value;
        }
        if (v.type === 'ArrayExpression') {
            deps = _.pluck(v.elements, 'value');
        }
        if (v.type === 'FunctionExpression') {
            if (v.body && v.body.type === 'BlockStatement') {
                walk(v.body);
            }
        }
    });
    //require()
    definedModule = definedModule || ('require' + ++counter);
    allDeps[definedModule] = deps;
}
function hasProp(obj, attr) {
    return Object.prototype.hasOwnProperty.call(obj, attr)
}
function onError(msg) {
    console.error(msg);
}
