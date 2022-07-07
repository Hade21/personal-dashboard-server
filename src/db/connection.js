const mongoose = require("mongoose");

function makeNewConnection(uri) {
  const db = mongoose.createConnection(uri);
  db.on("error", function (error) {
    console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
    db.close().catch(() =>
      console.log(`MongoDB :: failed to close connection ${this.name}`)
    );
  });
  db.on("connected", function () {
    console.log(`MongoDB :: connected ${this.name}`);
  });
  db.on("disconnected", function () {
    console.log(`MongoDB :: disconnected ${this.name}`);
  });
  return db;
}

const userConnection = makeNewConnection(
  "mongodb://RohmanM:ex04qnDKfp9k9k95@cluster0-shard-00-00.m7bvb.mongodb.net:27017,cluster0-shard-00-01.m7bvb.mongodb.net:27017,cluster0-shard-00-02.m7bvb.mongodb.net:27017/Users?ssl=true&replicaSet=atlas-12f0mw-shard-0&authSource=admin&retryWrites=true&w=majority"
);
const notesConnection = makeNewConnection(
  "mongodb://RohmanMuhammad:aX1xQbJRZbXzPoV1@cluster0-shard-00-00.69861.mongodb.net:27017,cluster0-shard-00-01.69861.mongodb.net:27017,cluster0-shard-00-02.69861.mongodb.net:27017/Notes?ssl=true&replicaSet=atlas-j7bc9p-shard-0&authSource=admin&retryWrites=true&w=majority"
);

module.exports = { userConnection, notesConnection };
