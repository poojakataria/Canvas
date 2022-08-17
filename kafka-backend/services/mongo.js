var MongoClient = require('mongodb').MongoClient;
const DATABASE = 'mysjsu';
var db;
var connected = false;

exports.connect = function (url, callback) {
    //console.log("db", db)
    if (!connected) {
        console.log("inside not connected")
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, dbclient) {
            if (err) { throw new Error('Could not connect: ' + err); }
            db = dbclient.db(DATABASE);
            connected = true;
            callback(db);
        });
    }
    else {
        //console.log("inside connected")
        callback(db)
    }

};

//connection pooling
// exports.connect = function (url, callback) {
//     console.log("db", db)
//     if (!connected) {
//         console.log("inside not connected")
//         MongoClient.connect(url, { useNewUrlParser: true, poolSize: 10 }, function (err, dbclient) {
//             if (err) { throw new Error('Could not connect: ' + err); }
//             db = dbclient.db(DATABASE);
//             connected = true;
//             //console.log(connected + " is connected");
//             callback(db);
//         });
//     }
//     else {
//         console.log("inside connected")
//         callback(db)
//     }

// };

exports.collection = function (name) {
    if (!connected) {
        throw new Error('Must connect to Mongo before calling "collection"');
    }
    return db.collection(name);

};

//exports.mongoURL = "mongodb+srv://admin:admin@cluster0-w7owm.mongodb.net/test?retryWrites=true";
exports.mongoURL = "mongodb://localhost:27017/mysjsu";