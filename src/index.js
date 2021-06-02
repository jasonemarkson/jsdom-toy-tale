let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const newToyForm = document.querySelector("body > div.container > form")
  const likeBtn = document.querySelectorAll('.like-btn')
  // const baseURL = 'http://localhost:3000/toys'

  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Fetch Andy's Toys

  function getDogs() {
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => 
      toys.forEach(toy => 
  // Add Toy Info to the Card
        
      toyCollection.innerHTML += `
        <div class="card" id=${toy.id}>
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes</p>
        <button class="like-btn">Like <3</button>
        </div>
        `
      ))
};
  
  getDogs();

  // Add a New Toy

  newToyForm.addEventListener("submit", handleSubmit)

  function handleSubmit(event){
    event.preventDefault()
    return fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify({
        "name": `${event.target.name.value}`,
        "image": `${event.target.image.value}`,
        "likes": 0
      })
    })
  }

  // Increase Toy's Likes

  toyCollection.addEventListener("click", () => {
    // event.className === "like-btn"
    if (event.target.className === "like-btn") {
      updateLikes(event)
    }
  });

  function updateLikes(event) {
    event.preventDefault()
    let e = event.target.parentElement
    let newLikeCount = parseInt(e.querySelector('p').innerHTML) + 1

    // update the DOM for the new like count
    e.querySelector('p').innerHTML = `${newLikeCount} Likes`

    // send PATCH request to the server
    fetch(`http://localhost:3000/toys/${e.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify({
        "likes": newLikeCount
      })
    });
  }
});
