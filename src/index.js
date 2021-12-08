let addToy = false;

const toyCollection = document.querySelector("#toy-collection")

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    
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

// function createToyCard(toyDiv){
//     toyDiv.className = 'card'
//     toyDiv.innerHTML += `
//     <h2>${toy.name}</h2>
//     <img src=${toy.image} class="toy-avatar"/>
//     <p>${toy.likes}</p>
//     <button>like-btn</button>
//     `
//     toyCollection.appendChild(toyDiv)
// }

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
  .then(newToy => {
    event.target.reset()
    let toyDiv = document.createElement('div')
    toyDiv.className = 'card'
    toyDiv.innerHTML += `
    <h2>${newToy.name}</h2>
    <img src=${newToy.image} class="toy-avatar"/>
    <p>${newToy.likes}</p>
    <button>like-btn</button>
    `
    toyCollection.appendChild(toyDiv)
    console.log("Added Toy", newToy)
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