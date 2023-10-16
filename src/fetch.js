const global = {
    page: 1
}

const getData = async () => {
    const res = await fetch(`http://localhost:8080/api/v1/bootcamps?page=${global.page}&limit=1`);
    const data = await res.json();

    return data;
}

const displayData = async ()  => {
    document.querySelector('.fetchData').innerHTML = '';
    const data = await getData();

    data.data.forEach((bootcamp) => {
        const div = document.createElement('div');
        div.classList.add('fetch');
        div.innerHTML = `
            <h1>${bootcamp.name}</h1>
            <p>${bootcamp.description}</p>
            <p>${bootcamp.email}</p>
        `;

        document.querySelector('.fetchData').appendChild(div);
    });
}

const next = async () => {
    const data = await getData();

    if (data.pagination.next) {
        global.page++;
        displayData();
    }
}

const prev = async () => {
    const data = await getData();

    if (data.pagination.prev) {
        global.page--;
        displayData();
    }
}

const eventListeners = () => {
    document.getElementById('prev').addEventListener('click', prev);
    document.getElementById('next').addEventListener('click', next);
}

const init = () => {   
    eventListeners();
    displayData();
}

init();

