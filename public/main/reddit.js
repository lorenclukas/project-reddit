const SERVER_URL = "http://localhost:3000";
const posts = document.querySelector(".posts");

const createNewPostButton = document.getElementById("new-post-button");
const modifyButtons = document.querySelectorAll(".modify-button");
const deleteButton = document.querySelector(".delete-button");

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
      const time = document.createElement("p");

      const timestamp = result.timestamp * 1000;
      const timestampDate = new Date(timestamp);
      const currentDate = new Date();

      const timeDifference = currentDate - timestampDate;
      const hoursAgo = Math.floor(timeDifference / 3600000);
      const minutesAgo = Math.floor((timeDifference / (1000 * 60)) % 60);

      let timeAgo;
      if (hoursAgo >= 1) {
        timeAgo = `Submitted ${hoursAgo} hours and ${minutesAgo} minutes ago.`;
      } else {
        timeAgo = `Submitted ${minutesAgo} minutes ago.`;
      }

      score.innerText = result.score;
      title.innerText = result.title;
      url.innerText = result.url;
      url.href = result.url;
      time.innerText = timeAgo;
      modifyButton.innerText = "Modify";
      deleteButton.innerText = "Delete";

      modifyButton.addEventListener("click", (event) => {
        const article = event.target.closest(".post");
        const postId = article.dataset.postId;
        window.location.href = `/modify-post?id=${postId}`;
      });

      article.classList.add("post");
      article.dataset.postId = result.id;
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
      contentDiv.appendChild(time);
      contentDiv.appendChild(buttonsDiv);

      article.appendChild(scoreDiv);
      article.appendChild(contentDiv);
      posts.appendChild(article);
    }
  })
  .catch((error) => {
    console.log(error);
  });

posts.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("upvote-button")) {
    const article = target.closest(".post");
    const score = article.querySelector(".score h3");
    const upvoteImg = target.querySelector("img");
    const postId = article.dataset.postId;

    fetch(`${SERVER_URL}/posts/${postId}/upvote`, { method: "PUT" })
      .then((response) => response.json())
      .then((data) => {
        score.innerText = data.score;
        upvoteImg.src = "images/upvoted.png";
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

posts.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("downvote-button")) {
    const article = target.closest(".post");
    const score = article.querySelector(".score h3");
    const downvoteImg = target.querySelector("img");
    const postId = article.dataset.postId;

    fetch(`${SERVER_URL}/posts/${postId}/downvote`, { method: "PUT" })
      .then((response) => response.json())
      .then((data) => {
        score.innerText = data.score;
        downvoteImg.src = "images/downvoted.png";
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

posts.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("delete-button")) {
    const article = target.closest(".post");
    const postId = article.dataset.postId;

    fetch(`${SERVER_URL}/posts/${postId}`, { method: "DELETE" })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      })
      .finally((window.location.href = "/"));
  }
});
