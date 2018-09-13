/******
 Author: Rohit Bhure
 Date: 07/09/2018
 *******/
const envKey = key => {
    const env = process.env.NODE_ENV || "development";
    const configuration = {
        development: {
            host: "localhost",
            port: 9000,
            storage: {
                devMongo:
                "mongodb://localhost:27017/registrationdb"
              }
            }
        }
    return configuration[env][key];
};

const manifest = {
    server: {
        port: envKey("port"),
        host: envKey("host"),
        routes: {
            cors: true
        },
        router: {
            stripTrailingSlash: true
        }
    },
    register: {
        plugins: [
            {
                plugin: "./api",
                routes: { prefix: "/api" }
            },
        ]
    }
};

exports.manifest = manifest;
exports.storage = envKey("storage");