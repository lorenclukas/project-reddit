# Reddit Clone App

This is a simple Reddit clone app that allows users to view, create, modify, and delete posts. The app uses Express.js as the server framework and MySQL as the database. It provides a basic interface for users to interact with the posts.

## Features

The Reddit Clone App includes the following features:

- **View all posts**: Users can see a list of all the posts on the main page.
- **View individual post**: Users can view the details of a specific post by clicking on it.
- **Create new post**: Users can submit a new post by clicking on the "Submit a New Post" button.
- **Modify post**: Users can modify a post by clicking on the "Modify" button and updating the post details.
- **Delete post**: Users can delete a post by clicking on the "Delete" button.
- **Upvote and downvote**: Users can upvote or downvote a post by clicking on the respective buttons.

## Installation

To use this app, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/reddit-clone.git`
2. Install the dependencies: `npm install`
3. Set up the MySQL database:
   - Make sure you have MySQL installed and running on your local machine.
   - Open the `server.js` file and update the database configuration settings (host, user, password) according to your MySQL setup.
   - The app will create a new database named `reddit` and a table named `posts` automatically if they don't exist.
4. Start the server: `node server.js`
5. Access the app in your browser at `http://localhost:3000`

## API Endpoints

The following API endpoints are available:

- `GET /posts`: Retrieve all posts
- `GET /posts/:id`: Retrieve a specific post by ID
- `POST /posts`: Create a new post
- `PUT /posts/:id`: Update a post by ID
- `PUT /posts/:id/upvote`: Upvote a post by ID
- `PUT /posts/:id/downvote`: Downvote a post by ID
- `DELETE /posts/:id`: Delete a post by ID

## Dependencies

The app relies on the following dependencies:

- `express`: Web framework for Node.js
- `mysql`: MySQL database driver for Node.js
- `cors`: Middleware for enabling Cross-Origin Resource Sharing (CORS)

Make sure to install these dependencies using `npm install`.

## Dependencies

The app relies on the following dependencies:

- `express`: Web framework for Node.js
- `mysql`: MySQL database driver for Node.js
- `cors`: Middleware for enabling Cross-Origin Resource Sharing (CORS)

Make sure to install these dependencies using `npm install`.
