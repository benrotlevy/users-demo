const usersContainer = document.getElementById("users-container")
const header = document.getElementById("main-header")
const nameInput = document.getElementById("user-name")
const passwordInput = document.getElementById("user-password")
const ageInput = document.getElementById("user-age")
const addBtn = document.getElementById("addBtn")
const message = document.getElementById("message")

async function createUser() {
    message.textContent = `sending user to server...`
    const newUser = {
        name: nameInput.value,
        password: passwordInput.value,
        age: ageInput.value
    }
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }
    try {
        const response = await fetch('http://localhost:3000/api/users', options)
        if(!response.ok) {
            throw new Error()
        } 
        const user = await response.json()
        console.log(user);
        message.textContent = `${user.name} added`
        createUserUI(user)
    } catch(error) {
        message.textContent = `error adding user`
        console.log(error);
    }
}

addBtn.addEventListener("click", createUser)

async function getUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/users')
        if(!response.ok) {
            throw new Error()
        }
        const data = await response.json();
        console.log(data);
        createUsersUI(data)
        changeHeader("My Users")
    } catch(error) {
        console.log(error);
        changeHeader("Error in loading users data")
    }
}

function createUsersUI(users) {
    for(let user of users) {
        createUserUI(user)
    }
}

function createUserUI(user) {
    const li = document.createElement("li")
    li.textContent = `user name: ${user.name}. user password: ${user.password}. user age: ${user.age}`
    usersContainer.append(li)
}

function changeHeader(newHeader) {
    header.textContent = newHeader
}

getUsers()