'use strict';

var fs = require('fs');

module.exports = function create(file) {

    return {
        read: function read() {
            try {
                return fs.readFileSync(file, { encoding: 'utf8'});
            } catch (err) {
                if (err.code !== 'ENOENT') {
                    throw err
                }
            }
        },

        write: function write(data) {
            fs.writeFileSync(file, data);
        }
    };

};
