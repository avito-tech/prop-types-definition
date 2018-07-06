var patch = require('./index.js');

module.exports = function(content) {
    return content + '(' + patch + ')(module.exports);';
};
