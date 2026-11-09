// ----------------------------------------------
// TCSS 460
// Activity 5A: Import activity5-db.sql into Aiven
// ----------------------------------------------
// This replaces the phpMyAdmin "Import" step used
// with XAMPP. It reads activity5-db.sql and runs every
// statement in it on your cloud MySQL service.
//
// Run once from the backend folder:
//     node import-db.js
//
// Running it again rebuilds the database from
// scratch (the script starts with DROP DATABASE),
// which is a handy way to reset the data.
// ----------------------------------------------
require("dotenv").config({ quiet: true });
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

// Connect to 'defaultdb', the database Aiven creates
// for every new service. activity5-db does not exist yet.
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "defaultdb",
    ssl: { ca: fs.readFileSync(path.join(__dirname, "ca.pem")) },
    multipleStatements: true // allow the whole .sql file in one request
});

const sqlScript = fs.readFileSync(path.join(__dirname, "activity5-db.sql"), "utf8");

connection.query(sqlScript, (err) => {
    if (err) {
        console.error("Import failed:", err.message);
        connection.destroy(); // close without waiting (the connection may already be closed)
        process.exitCode = 1;
        return;
    }
    // Confirm the import by counting the rows that were added
    connection.query("SELECT COUNT(*) AS cities FROM `activity5-db`.population;", (err, rows) => {
        if (err) {
            console.error("Import ran, but the check query failed:", err.message);
        } else {
            console.log("Import complete: activity5-db.population has " + rows[0].cities + " cities.");
        }
        connection.end();
    });
});
