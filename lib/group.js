var _ = require('lodash');
module.exports = {
    autonavi: function (name) {
        var groupName;
        var nameArr = name.split('/');
        if (nameArr[0] === 'tpl' || nameArr[0] === 'mod') {
            groupName = nameArr[1];
        } else {
            groupName = nameArr[0];
        }
        return groupName
    }
}
