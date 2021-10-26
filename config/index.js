const local = require('./local');

module.exports = {
    mongoDB: {
        options: {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            user: process.env.mongoUser || local.mongoDB.options.mongoUser,
            pass: process.env.mongoPass || local.mongoDB.options.mongoPass
        },
        URL: process.env.mongoURL || local.mongoDB.mongoURL,
    },
    port: process.env.PORT || local.port
}
