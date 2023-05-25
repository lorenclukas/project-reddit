const SERVER_URL = "http://localhost:3000";
const posts = document.querySelector(".posts");

const createNewPostButton = document.getElementById("new-post-button");
const deleteButton = document.querySelector(".delete-button");

createNewPostButton.addEventListener("click", () => {
  window.location.href = "/new-post";
});

fetch(`${SERVER_URL}/posts`)
  .then((response) => response.json())
  .then((data) => {
    const results = data.posts;
    for (const result of results) {
      const timestamp = result.timestamp * 1000;
      const timestampDate = new Date(timestamp);
      const currentDate = new Date();

      const timeDifference = currentDate - timestampDate;
      const hoursAgo = Math.floor(timeDifference / 3600000);
      const minutesAgo = Math.floor((timeDifference / (1000 * 60)) % 60);

      let timeAgo =
        hoursAgo >= 1
          ? `Submitted ${hoursAgo} hours and ${minutesAgo} minutes ago.`
          : `Submitted ${minutesAgo} minutes ago.`;

      const html = `
      <article class="post" data-post-id="${result.id}">
      <div class="score">
        <button class="upvote-button"><img src="images/upvote.png" /></button>
        <h3>${result.score}</h3>
        <button class="downvote-button"><img src="images/downvote.png" /></button>
      </div>
      <div class="post-content">
        <h2>${result.title}</h2>
        <a href="${result.url}">${result.url}</a>
        <p>${timeAgo}</p>
        <div class="action-buttons">
          <button class="modify-button">Modify</button>
          <button class="delete-button">Delete</button>
        </div>
      </div>
    </article>`;

      posts.innerHTML += html;

      const modifyButtons = document.querySelectorAll(".modify-button");
      modifyButtons.forEach((modifyButton) => {
        modifyButton.addEventListener("click", (event) => {
          const article = event.target.closest(".post");
          const postId = article.dataset.postId;
          window.location.href = `/modify-post?id=${postId}`;
        });
      });
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
