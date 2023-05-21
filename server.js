const express = require("express");
const app = express();
const PORT = 3000;
const mysql = require("mysql");

const conn = mysql.createConnection({
  password: "password",
  host: "localhost",
  user: "root",
  database: "",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
    console.log("Something happened while trying to connect to the database");
    return;
  }

  conn.query(`CREATE DATABASE IF NOT EXISTS reddit`, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Connection to the database established");

    conn.query(`USE reddit`, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Database selected");

      const createRedditDatabaseTable = `CREATE TABLE IF NOT EXISTS posts (
          id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
          title VARCHAR(45) NOT NULL,
          url TEXT NOT NULL,
          timestamp INT NOT NULL,
          score INT
        )`;

      conn.query(createRedditDatabaseTable, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Table 'posts' created");
      });
    });
  });
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
