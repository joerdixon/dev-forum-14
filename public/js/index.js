// DOM Selectors
const logoutButton = document.querySelector("#logout");
const loginSubmit = document.querySelector("#login-user")

console.log("connected to public index");

// Post request from the frontend to log in a user. 
const loginUser = async (event) => {
    event.preventDefault();
    console.log("hi")
    // Get the user input from the form and store in variables
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    // If both have content.
    if (username && password) {
        // Post the content to our login route
        const response = await fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            console.log("yess");
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
};

// Get request from the frontend to logout a user.
const logoutUser = async () => {
    const response = await fetch('/users/logout', {
        method: 'GET'
    })
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out');
    }
};

logoutButton.addEventListener("click", logoutUser);
loginSubmit.addEventListener("click", loginUser);