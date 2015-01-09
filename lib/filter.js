var _ = require('lodash');
module.exports = {
    autonavi: function (obj) {
        return obj;
        var modDepsCombine = {};
        _.forEach(obj, function (v, k) {
            combine(v, k);
        });
        _.forEach(modDepsCombine, function (v, k) {
            _.forEach(v, function (v1, index) {
                if (v1 && v1.indexOf('mod/') === 0) {
                    v[index] = v1.split('/').slice(0, 2).join('/')
                }
                if (v[index] === k) {
                    v[index] = void 0;
                }
            });
            modDepsCombine[k] = _.uniq(v);
        });
        return modDepsCombine;
        function combine(v, k) {
            if (k.indexOf('mod/') === 0) {
                var tmp = k.split('/');
                var key = 'mod/' + tmp[1]
                modDepsCombine[key] = modDepsCombine[key] || [];
                if (v) {
                    modDepsCombine[key] = modDepsCombine[key].concat(v);
                }
            } else {
                modDepsCombine[k] = v;
            }
        }
    }
}
