/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', () => {
    const userLoginButton = document.querySelector('#userLoginButton') as HTMLButtonElement;
    userLoginButton.addEventListener('click', loginUser);

    const adminLoginButton = document.getElementById('adminLoginButton') as HTMLButtonElement;
    adminLoginButton.addEventListener('click', loginAdmin);
});

async function loginUser() {
    const email = (document.querySelector('#loginEmail') as HTMLInputElement).value;
    const password = (document.querySelector('#loginPassword') as HTMLInputElement).value;
    const role: string = 'user';

    if (!email || !password) {
        alert('Please fill in all the fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                role: role,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                alert('Invalid credentials. Please try again.');
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } else {
            console.log(data);
            const token: string = data.accepted_token;
            localStorage.setItem('token', token);
            console.log('Login successful');
            window.location.href = 'Home.html';
        }
    } catch (error) {
        console.error('Error:', (error as Error).message);
        alert('An error occurred. Please try again later.');
    }
}

async function loginAdmin() {
    const email = (document.querySelector('#loginEmail') as HTMLInputElement).value;
    const password = (document.querySelector('#loginPassword') as HTMLInputElement).value;
    const role: string = 'admin';

    if (!email || !password) {
        alert('Please fill in all the fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                role: role,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                alert('Invalid credentials. Please try again.');
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } else {
            console.log(data);
            const token: string = data.accepted_token;
            localStorage.setItem('token', token);
            console.log('Login successful');
            window.location.href = 'admin-page.html';
        }
    } catch (error) {
        console.error('Error:', (error as Error).message);
        alert('An error occurred. Please try again later.');
    }
}

async function signupUser() {
    const username = (document.querySelector('#Username') as HTMLInputElement).value;
    const password = (document.querySelector('#Password') as HTMLInputElement).value;
    const email = (document.querySelector('#Email') as HTMLInputElement).value;

    if (!username || !password || !email) {
        alert('Fill in all the forms');
        return;
    }

    try {
        const response = await fetch('http://localhost/3000/auth/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "role": "user",
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Registered successfully');
    } catch (error) {
        console.error('Error:', (error as Error).message);
    }

    window.location.href = 'index.html';
}

async function signupAdmin() {
    const username = (document.querySelector('#Username') as HTMLInputElement).value;
    const password = (document.querySelector('#Password') as HTMLInputElement).value;
    const email = (document.querySelector('#Email') as HTMLInputElement).value;

    if (!username || !password || !email) {
        alert('Fill in all the forms');
        return;
    }

    try {
        const response = await fetch('http://localhost/3000/auth/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "role": "admin",
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Registered successfully');
    } catch (error) {
        console.error('Error:', (error as Error).message);
    }

    window.location.href = 'index.html';
}
