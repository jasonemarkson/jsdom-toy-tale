let addToy = false;
function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    const toyCollection = document.querySelector("#toy-collection")

    toys.map(toy => {

      let toyDiv = document.createElement('div')
      toyDiv.className = 'card'
      toyDiv.innerHTML += `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar"/>
      <p>${toy.likes}</p>
      <button>like-btn</button>
      `
      toyCollection.appendChild(toyDiv)
    })
      console.log("toys array", toys)
  }
  )
}
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  // const toyCollection = document.querySelector("#toy-collection")
  fetchToys();
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })
  ;
})