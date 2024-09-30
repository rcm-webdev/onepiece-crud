const update = document.querySelector("#update-button");

update.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("/quotes", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Gorosei",
      quote:
        "History is written by the victors. The truth is what we decree it to be.",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      window.location.reload(true);
    });
});

const messageDiv = document.querySelector("#message");

const deleteButton = document.querySelector("#delete-button");

deleteButton.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("/quotes", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Gorosei",
    }),
  })
    .then((response) => {
      if (response === "No quote to delete") {
        messageDiv.textContent =
          "Thanks to your unwavering spirit and the power of the future Pirate King, all of the World Government's lies have been washed away, allowing Dr. Vegapunk's wisdom to shine brightly and guiding us toward the true history of our world.";
      } else {
        window.location.reload(true);
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
