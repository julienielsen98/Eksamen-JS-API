loadUsers("https://randomuser.me/api/?results=10").then(() => {
  console.log("USERS - index:", usersArray);
});

let usersArray = [];
let favoritesArray = [];
let ownCardArray = [];

async function loadUsers(url) {
  const objects = await fetch(url);
  const users = await objects.json();
  return users.results;
}

let maleBtn = document.getElementById(`male`);
maleBtn.addEventListener("click", () => {
  displayUsers(`male`);
});
let femaleBtn = document.getElementById(`female`);
femaleBtn.addEventListener("click", () => {
  displayUsers(`female`);
});

const usersList = document.getElementById(`usersList`);

function displayUsers(filter) {
  usersList.innerHTML = "";
  for (let i = 0; i < usersArray.length; i++) {
    if (usersArray[i].gender === `${filter}`) {
      usersList.innerHTML += `<li id="cards"> <img src="${usersArray[i].picture}" alt="users-images"/> 
      <h3> ${usersArray[i].name},${usersArray[i].dob} </h3>
        <p> ${usersArray[i].location} </p>
        <p> Mail: ${usersArray[i].email}  </p>
        <p> Phone: ${usersArray[i].phone} </p>
        <button id="favorite-btn" onclick="addToFavorites(${i})">🖤 </button>
           
       </li>`;
    }
  }
}

const favoriteList = document.getElementById(`favoriteList`);
const favoriteNavBtn = document.getElementById(`favorite-navBtn`);

function addToFavorites(i) {
  favoriteList.innerHTML = "";
  favoritesArray.push(`<li id="cards"> <img src="${usersArray[i].picture}" alt="users-images"/> 
      <h3> ${usersArray[i].name},${usersArray[i].dob} </h3>
        <p> ${usersArray[i].location} </p>
        <p> Mail: ${usersArray[i].email}  </p>
        <p> Phone: ${usersArray[i].phone} </p>
        <button id="delete-btn" onclick="deleteItem(${i})">Remove</button>
       </li>`);
  console.log(favoritesArray);

  favoriteList.innerHTML = favoritesArray;
}

function deleteItem(i) {
  usersArray.splice(i, 1);
  addToFavorites();
}

let inputContainer = document.getElementById("input-container");
let createUserBtn = document.createElement("button");
createUserBtn.innerText = "Add user";
let ownCard = document.createElement("ul");
inputContainer.append(createUserBtn, ownCard);

createUserBtn.addEventListener("click", () => {
  addUser();
});

function addUser() {
  ownCard.innerHTML = "";

  let inputImg = document.getElementById(`img-input`).value;
  let inputName = document.getElementById(`name-input`).value;
  let inputGender = document.getElementById(`gender-input`).value;
  let inputAge = document.getElementById(`dateOfBirth-input`).value;
  let inputLocation = document.getElementById(`location-input`).value;
  let inputEmail = document.getElementById(`email-input`).value;
  let inputPhone = document.getElementById(`phone-input`).value;

  const newUser = {
    picture: inputImg,
    name: inputName,
    gender: inputGender,
    dob: inputAge,
    location: inputLocation,
    email: inputEmail,
    phone: inputPhone,
  };
  if (newUser.picture === "" || newUser.gender === "male") {
    newUser.picture = `https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113__340.png`;
  }
  if (newUser.picture === "" || newUser.gender === "female") {
    newUser.picture = `https://cdn.pixabay.com/photo/2016/04/26/07/20/woman-1353803__340.png`;
  }
  if (newUser.name === "" || newUser.gender === "") {
    alert("Name & gender must be filled in");
  } else {
    usersArray.unshift(newUser);
    ownCardArray.unshift(newUser);
    displayUsers();

    ownCard.innerHTML += `<li id="cards"> <img src="${newUser.picture}" alt="users-images"/> 
      <h3> ${newUser.name},${usersArray.dob} </h3>
        <p> ${newUser.location} </p>
        <p> Mail: ${newUser.email}  </p>
        <p> Phone: ${newUser.phone} </p>
        <button id="delete-btn" onclick="deleteCard()">Remove</button>
       </li>`;
  }
}

function deleteCard() {
  let confirmDelete = prompt(
    `Clear favoriteslist?
    write yes or no.`
  );
  if (confirmDelete === "yes") {
    alert(`Favorites cleard`);
    ownCard.innerHTML = "";
  } else {
    alert("Clearence canceled ");
  }
}
function newCard(card) {
  card.innerHTML = "";
  for (let i = 0; i < ownCardArray.length; i++) {
    card.innerHTML += `<img src="${ownCardArray[i].picture}" alt="users-images"/> 
      <h3> ${ownCardArray[i].name},${ownCardArray[i].dob} </h3>
        <p> ${ownCardArray[i].location} </p>
        <p> Mail: ${ownCardArray[i].email}  </p>
        <p> Phone: ${ownCardArray[i].phone} </p>
        <button id="delete-btn" onclick="deleteCard(${i})">Remove</button>
       `;
    console.log(ownCardArray);
    console.log(card);
  }
}
