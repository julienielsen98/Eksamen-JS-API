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

const usersList = document.getElementById(`usersList`);

const favoriteList = document.getElementById(`favoriteList`);

let maleBtn = document.getElementById(`male`);
maleBtn.addEventListener("click", () => {
  displayUsers(usersArray, `male`);
});
let femaleBtn = document.getElementById(`female`);
femaleBtn.addEventListener("click", () => {
  displayUsers(usersArray, `female`);
});

function displayUsers(array, filter) {
  usersList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    let li = document.createElement("li");
    if (array[i].gender === `${filter}` && array == usersArray) {
      li.classList.add("cards");
      li.innerHTML = `<img src="${array[i].picture}" alt="users-images"/> 
      <h3> ${array[i].name},${array[i].dob} </h3>
        <p> ${array[i].location} </p>
        <p> Mail: ${array[i].email}  </p>
        <p> Phone: ${array[i].phone} </p>
         `;
      let favoriteBtn = document.createElement("button");
      favoriteBtn.classList.add("favorite-btn");
      favoriteBtn.innerText = "🖤 ";
      li.append(favoriteBtn);
      usersList.append(li);

      favoriteBtn.addEventListener("click", () => {
        let moveBackBtn = document.createElement("button");
        moveBackBtn.innerText = "remove";
        favoriteBtn.remove();
        li.append(moveBackBtn);
        favoriteList.append(li);

        moveBackBtn.addEventListener("click", () => {
          usersList.append(li);
        });
      });
    }
  }
}

let inputContainer = document.getElementById("input-container");
let createUserBtn = document.createElement("button");
createUserBtn.innerText = "Add user";
let ownCardContainer = document.createElement("ul");
inputContainer.append(createUserBtn, ownCardContainer);

createUserBtn.addEventListener("click", () => {
  addUser();
});

function addUser() {
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
    displayUsers(usersArray);
    ownCardArray.push(newUser);

    console.log(ownCardArray);

    showCard();
  }
}

let deleteBtn = document.createElement("button");
deleteBtn.innerText = "remove";

function showCard() {
  ownCardContainer.innerHTML = "";
  usersList.innerHTML = "";

  for (let i = 0; i < ownCardArray.length; i++) {
    ownCardContainer.innerHTML += `<div class="cards"> <img src="${ownCardArray[i].picture}" alt="users-images"/> 
      <h3> ${ownCardArray[i].name},${ownCardArray[i].dob} </h3>
        <p> ${ownCardArray[i].location} </p>
        <p> Mail: ${ownCardArray[i].email}  </p>
        <p> Phone: ${ownCardArray[i].phone} </p> </div>
       `;

    ownCardContainer.append(deleteBtn);
  }
}

deleteBtn.addEventListener("click", () => {
  deleteCard();
});

function deleteCard(i) {
  ownCardArray.splice(i, 1);
  usersArray.splice(i, 1);

  showCard();
}
