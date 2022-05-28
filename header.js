const loadResults = async () => {
  const objects = await fetch("https://randomuser.me/api/?results=10");
  const users = await objects.json();
  console.log("USERS - header:", users.results);
  displayResults(users.results);

  users.results.forEach((users) => {
    usersClass = new Users(
      users.picture,
      users.name,
      users.gender,
      users.dob,
      users.location,
      users.email,
      users.phone
    );

    usersArray.push(usersClass);
    randomeUsers();
  });
};

class Users {
  constructor(picture, name, gender, dob, location, email, phone) {
    this.picture = picture.medium;
    this.name = name.first;
    this.gender = gender;
    this.dob = dob.age;
    this.location = `${location.country} , ${location.city} - ${location.street.name},${location.street.number}  `;
    this.email = email;
    this.phone = phone;
  }
}

let searchResults = document.getElementById(`searchResults`);
const resultsList = document.createElement(`ul`);

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  searchResults.append(resultsList);
});

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredResults = usersArray.filter((users) => {
    return (
      users.name.toLowerCase().includes(searchString) ||
      users.gender.toLowerCase().includes(searchString) ||
      users.location.toLowerCase().includes(searchString)
    );
  });
  displayResults(filteredResults);
});

const displayResults = (users) => {
  const htmlString = users
    .map((users) => {
      return ` 
       <p> ${users.name.first},
 ${users.dob.age}, ${users.gender} -
  ${users.location.country}, ${users.location.city} - 
   mail: ${users.email} , Phone: ${users.phone} </p> - `;
    })
    .join("");
  resultsList.innerHTML = htmlString;
};

const randomeList = document.getElementById(`randomeList`);
const nextBtn = document.getElementById("nextBtn");

/*nextBtn.addEventListener("click", () => {
  randomeUsers();
});*/

window.addEventListener("load", (event) => {
  loadResults();
});

function randomeUsers() {
  randomeList.innerHTML = `<li class="cards" > <img src="${usersClass.picture}" alt="users-images"/> 
      <h3> ${usersClass.name},   ${usersClass.dob} </h3> 
        <p> ${usersClass.location} </p>
        <p> Mail: ${usersClass.email} </p>
        <p> Phone: ${usersClass.phone} </p>
        
       </li>`;
}
