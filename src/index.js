let addToy = false;
function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    let toyCollection = document.querySelector("#toy-collection")
    // toysDiv.className = "card"
    // document.body.appendChild(toysDiv)
    toys.map(toy =>
      toyCollection.innerHTML += `
      <h2>${toy.name}<h2>
      <img src=${toy.image} />
      <p>${toy.likes}</p>
      <button>like-btn</button>
      `
      )
      console.log("toys array", toys)
  }
  )
}
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })
  fetchToys();
  ;
})