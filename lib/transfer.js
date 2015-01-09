var fs = require('fs');
var _ = require('lodash');
var filter = require('./filter');
var group = require('./group');

var nodes = [];
var links = [];
var counter = 0;
module.exports = {
    /* dynamic force layout*/
    /**数据格式
     * {
     *    "nodes":[
     *        {"name":"Myriel","group":1},
     *        {"name":"Napoleon","group":1},
     *        {"name":"Mlle.Baptistine","group":1},
     *    ],
     *     "links":[
     *         {"source":1,"target":0,"value":1},
     *         {"source":2,"target":0,"value":8},
     *     ]
    *}
    **/
    dfl: function (obj, filterType) {
        var source;
        var target;
        console.log(filterType);
        var filterFn = filter[filterType];
        var groupFn = group[filterType];
        if (filterFn) {
            obj = filterFn(obj);
        }
        //nodes
        _.forEach(obj, function (v, k) {
            toNodeByName(k);
            _.forEach(v, function (v1) {
                toNodeByName(v1);
            });
        });
        //nodes
        _.forEach(obj, function (v, k) {
            source = findNode('name', k).id;
            _.forEach(v, function (v1) {
                target = findNode('name', v1).id;
                links.push({source: source, target: target, value: 10})
            });
        });
        return {
            nodes: nodes,
            links: links
        };
        function toNodeByName(name) {
            var tmp;
            if(!findNode('name', name)) {
                tmp = {name: name, id: counter++};
                tmp.group = groupFn(name, tmp.id);
                nodes.push(tmp)
            }
        }
    }
};
function findNode(attr, tv) {
    var rt;
    _.forEach(nodes, function (v) {
        if (v[attr] === tv) {
            rt = v;
        }
    });
    return rt;
}
function hasProp(obj, attr) {
    return Object.prototype.hasOwnProperty.call(obj, attr)
}
