let addToy = false;

const toyCollection = document.querySelector("#toy-collection")


function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {

    toys.map(toy => 
      createToyCard(toy)
    )
    console.log("toys array", toys)
  }
  )
}

function createToyCard(toy){
  let toyDiv = document.createElement('div')
  toyDiv.className = 'card'
  toyDiv.innerHTML += `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar"/>
  <p>${toy.likes}</p>
  <button class=like-btn id=${toy.id}>like-btn</button>
  `
  toyCollection.appendChild(toyDiv)
}

function handleFormSubmit(event){
  event.preventDefault()
  let name = document.querySelector("body > div.container > form > input:nth-child(2)")
  let image = document.querySelector("body > div.container > form > input:nth-child(4)")
  
  const newToyObj = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": name.value,
      "image": image.value,
      "likes": 0
    })
  }
  const toyCollection = document.querySelector("#toy-collection")
  
  fetch('http://localhost:3000/toys', newToyObj)
  .then(response => response.json())
  .then(toy => {
    event.target.reset()
    createToyCard(toy)
    console.log("Added New Toy", toy)
  }

  )
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  // const toyCollection = document.querySelector("#toy-collection");
  fetchToys();
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", handleFormSubmit)
    } else {
      toyFormContainer.style.display = "none";
    }
  })
  ;
})