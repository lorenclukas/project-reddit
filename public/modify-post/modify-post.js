const SERVER_URL = "http://localhost:3000";

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  const form = document.querySelector(".modify-post-form");
  const inputTitle = form.querySelector('input[name="title"]');
  const inputUrl = form.querySelector('input[name="url"]');

  fetch(`${SERVER_URL}/posts/${postId}`)
    .then((response) => response.json())
    .then((data) => {
      const { title, url } = data;
      inputTitle.value = title;
      inputUrl.value = url;
    })
    .catch((error) => {
      console.log(error);
    });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newTitle = inputTitle.value;
    const newUrl = inputUrl.value;

    const newPostData = {
      title: newTitle,
      url: newUrl,
    };

    fetch(`${SERVER_URL}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPostData),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
