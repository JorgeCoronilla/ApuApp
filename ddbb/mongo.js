const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI_MONGO, {useNewUrlPArser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', (error) => console.log("error"));
db.once('open', ()=> console.log("Connected to db"));