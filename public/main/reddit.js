const SERVER_URL = "http://localhost:3000";
const posts = document.querySelector(".posts");

const createNewPostButton = document.getElementById("new-post-button");
createNewPostButton.addEventListener("click", () => {
  window.location.href = "/new-post";
});

fetch(`${SERVER_URL}/posts`)
  .then((response) => response.json())
  .then((data) => {
    const results = data.posts;
    for (const result of results) {
      const scoreDiv = document.createElement("div");
      const article = document.createElement("article");
      const upvoteButton = document.createElement("button");
      const upvote = document.createElement("img");
      const score = document.createElement("h3");
      const downvoteButton = document.createElement("button");
      const downvote = document.createElement("img");
      const contentDiv = document.createElement("div");
      const title = document.createElement("h2");
      const url = document.createElement("a");
      const buttonsDiv = document.createElement("div");
      const modifyButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      score.innerText = result.score;
      title.innerText = result.title;
      url.innerText = result.url;
      modifyButton.innerText = "Modify";
      deleteButton.innerText = "Delete";

      article.classList.add("post");
      scoreDiv.classList.add("score");
      upvoteButton.classList.add("upvote-button");
      upvote.setAttribute("src", "images/upvote.png");
      downvoteButton.classList.add("downvote-button");
      downvote.setAttribute("src", "images/downvote.png");
      contentDiv.classList.add("post-content");
      buttonsDiv.classList.add("action-buttons");
      modifyButton.classList.add("modify-button");
      deleteButton.classList.add("delete-button");

      upvoteButton.appendChild(upvote);
      downvoteButton.appendChild(downvote);
      scoreDiv.appendChild(upvoteButton);
      scoreDiv.appendChild(score);
      scoreDiv.appendChild(downvoteButton);

      buttonsDiv.appendChild(modifyButton);
      buttonsDiv.appendChild(deleteButton);
      contentDiv.appendChild(title);
      contentDiv.appendChild(url);
      contentDiv.appendChild(buttonsDiv);

      article.appendChild(scoreDiv);
      article.appendChild(contentDiv);
      posts.appendChild(article);
    }
  })
  .catch((error) => {
    console.log(error);
  });