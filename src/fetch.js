const global = {
    page: 1,
    loginForm: document.querySelector('.loginForm'),
    email: document.querySelector('.email'),
    password: document.querySelector('.password')
}

// const getData = async () => {
//     const res = await fetch(`http://localhost:8080/api/v1/bootcamps?page=${global.page}&limit=1`);
//     const data = await res.json();

//     return data;
// }

// const loggedIn = async () => {
//     const res = await fetch('http://localhost:8080/api/v1/auth/me');
//     const data = await res.json();

//     return data;
// }

// const displayData = async ()  => {
//     document.querySelector('.fetchData').innerHTML = '';
//     const data = await getData();

//     data.data.forEach((bootcamp) => {
//         const div = document.createElement('div');
//         div.classList.add('fetch');
//         div.innerHTML = `
//             <h1>${bootcamp.name}</h1>
//             <p>${bootcamp.description}</p>
//             <p>${bootcamp.email}</p>
//         `;

//         document.querySelector('.fetchData').appendChild(div);
//     });
// }

// const next = async () => {
//     const data = await getData();

//     if (data.pagination.next) {
//         global.page++;
//         displayData();
//     }
// }

// const prev = async () => {
//     const data = await getData();

//     if (data.pagination.prev) {
//         global.page--;
//         displayData();
//     }
// }

const eventListeners = (e) => {
    // document.getElementById('prev').addEventListener('click', prev);
    // document.getElementById('next').addEventListener('click', next);
    global.loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = global.email.value;
        const password = global.password.value;
        
        const res = await fetch('http://localhost:8080/api/v1/auth/login', {
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password})
        });

        // instead of the server outpuing the data we are requesting that data to the front end
        const data = await res.json();

        console.log(data.token);

        // if (document.cookie.includes('token')) {
        //     console.log('Cookie is set');
        // } else {
        //     console.log('no cookie set');
        // };

        if (data.success === true) {
            const responce = await fetch('http://localhost:8080/api/v1/auth/me', {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    "authorization": "Bearer " + data.token
                }
            });

            const meee = await responce.json();

            console.log(meee);
        } else {
            window.location.href = './no.html'
        }
    });
}

const init = () => {   
    eventListeners();
    // displayData();
}

init();

