const SERVER_URL = "http://localhost:3000";

const form = document.querySelector(".new-post-form");
const button = document.querySelector(".create-post-button");

button.addEventListener("click", async (event) => {
  event.preventDefault();
  const inputForm = new FormData(form);
  const formData = Object.fromEntries(inputForm);
  try {
    const response = await fetch(`${SERVER_URL}/posts`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (!response.ok) {
      const result = await response.text();
      throw new Error(result);
    }
  } catch (err) {
    console.log(err);
  }
});
