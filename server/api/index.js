/******
 Author: Rohit Bhure
 Date: 07/09/2018
 *******/
const Registration = require('./handlers/registration');

exports.plugin = {
    name: 'api',
    register: (server) => {
        server.route(Array.prototype.concat(
            Registration.routes
        ));
    }
};
