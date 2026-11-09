// ----------------------------------------------
// TCSS 460
// MySQL Configuration: Backend (Cloud Version)
// ----------------------------------------------
// Code is based on the
// Node.js for MySQL Library (mysql2):
// https://github.com/sidorares/node-mysql2
// ----------------------------------------------
// CHANGES FROM THE LOCAL (XAMPP) VERSION:
//   1. 'mysql' is replaced by 'mysql2'. The cloud
//      database runs MySQL 8, which uses a newer
//      login method that the old 'mysql' library
//      does not support. mysql2 has the same API,
//      so no other code needs to change.
//   2. Connection details are read from a .env
//      file (local) or from Render's Environment
//      settings (deployed), not typed into code.
//   3. The connection uses SSL (encryption), which
//      Aiven requires. ca.pem is Aiven's public
//      CA certificate, downloaded from the console.
// ----------------------------------------------

// ----------------------------------------------
// (A) Import the MySQL module or library, and
//     load the settings stored in the .env file
// ----------------------------------------------
require("dotenv").config({ quiet: true });
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

// ----------------------------------------------
// (B) Configure the connection options for MySQL
//     The database name is: 'activity5-db'
//     This is the database that we have created
//     in Part I using the Aiven cloud console.
// ----------------------------------------------
// ###### values come from the .env file ######
// ----------------------------------------------
// DB_HOST, DB_PORT, DB_USER and DB_PASSWORD are
// shown on the Overview page of your Aiven MySQL
// service. Aiven does NOT use port 3306; copy the
// port number exactly as shown.
// ----------------------------------------------
const mysqlConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "activity5-db",
    ssl: {
        ca: fs.readFileSync(path.join(__dirname, "ca.pem"))
    },
    debug: false // Connection debugging mode is ON
};

// ----------------------------------------------
// (C) Establishing connection using the options
//     defined in mySQLConfig (without a query)
// ----------------------------------------------
const dbConnection = mysql.createConnection(mysqlConfig);
dbConnection.connect(function(err) {
    // unsucessful: handle any errors that might occur during connection
    if (err) {
        console.error('Opps. There was an error connecting to the database: ', err.stack);
        return;
    }
    // successful: output on the screen a message that connection was successful
    console.log('Backend is now connected to: ' + dbConnection.config.database + '.');
});

// ----------------------------------------------
// (D) This module exports dbConnection to be
//     used other files (e..g, index.js)
// ----------------------------------------------
module.exports = dbConnection;
