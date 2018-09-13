/******
 Author: Rohit Bhure
 Date: 07/09/2018
 *******/
const mongoose = require('mongoose');
const Glue = require('glue');
const { manifest, storage } = require('./config/index');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const options = {
    relativeTo: __dirname
};

const startServer = async function () {
    try {
        const server = await Glue.compose(manifest, options);
        const devServer = await MongoClient.connect(storage['devMongo'])
        server.decorate('request', 'user', devServer.db('registrationdb'));
        await server.start();
        console.log('Server is listening on ', process.env.PORT);
    }
    catch (err) {
        // console.error(err);
        console.log('server.register err:', err);
        process.exit(1);
    }
};

startServer();
