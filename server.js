const express = require("express");
const app = express();
const PORT = 3000;
const mysql = require("mysql");

app.use(express.json());

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
          score INT NULL
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

app.get("/posts", (req, res) => {
  const selectRedditPostsQuery = `SELECT * FROM posts`;

  conn.query(selectRedditPostsQuery, (err, rows) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send(
          "Something happened while trying to retrieve the data from the database"
        );
    }

    const posts = rows.map((row) => ({
      id: row.id,
      title: row.title,
      url: row.url,
      timestamp: row.timestamp,
      score: row.score,
    }));

    const response = { posts };

    return res.status(200).json(response);
  });
});

app.post("/posts", (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).send("Please provide title and url!");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const score = 0;

  const insertRedditPostQuery = `INSERT INTO posts (title, url, timestamp, score) VALUES (?, ?, ?, ?)`;

  conn.query(
    insertRedditPostQuery,
    [title, url, timestamp, score],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(
          "Something happened while trying to insert data into the database table"
        );
      }

      const postId = result.insertId;

      const response = {
        id: postId,
        title,
        url,
        timestamp,
        score,
      };

      return res.status(200).json(response);
    }
  );
});

app.put("/posts/:id/upvote", (req, res) => {
  const postId = req.params.id;

  const upvoteRedditPostQuery = `UPDATE posts SET score = score + 1 WHERE id = ?`;

  conn.query(upvoteRedditPostQuery, [postId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Something happened while trying to upvote");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Cannot find the post");
    }

    const getRedditPostQuery = `SELECT * FROM posts WHERE id = ?`;

    conn.query(getRedditPostQuery, [postId], (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Cannot retrieve the post");
      }

      const post = rows[0];

      const response = {
        id: post.id,
        title: post.title,
        url: post.url,
        timestamp: post.timestamp,
        score: post.score,
      };
      console.log("Post upvoted");
      return res.status(200).json(response);
    });
  });
});

app.put("/posts/:id/downvote", (req, res) => {
  const postId = req.params.id;

  const downvoteRedditPostQuery = `UPDATE posts SET score = score - 1 WHERE id = ?`;

  conn.query(downvoteRedditPostQuery, [postId], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send("Something happened while trying to downvote");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Cannot find the post");
    }

    const getRedditPostQuery = `SELECT * FROM posts WHERE id = ?`;

    conn.query(getRedditPostQuery, [postId], (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Cannot retrieve the post");
      }

      const post = rows[0];

      const response = {
        id: post.id,
        title: post.title,
        url: post.url,
        timestamp: post.timestamp,
        score: post.score,
      };
      console.log("Post downvoted");
      return res.status(200).json(response);
    });
  });
});

app.delete("/posts/:id", (req, res) => {
  const postId = req.params.id;

  const deleteRedditPostQuery = `DELETE FROM posts WHERE id = ?`;

  conn.query(deleteRedditPostQuery, [postId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Unable to delete post");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Cannot find the post");
    }

    const response = {
      id: postId,
      title: req.body.title,
      url: req.body.url,
      timestamp: req.body.timestamp,
      score: req.body.score,
    };
    console.log("Post deleted");
    return res.status(200).json(response);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
