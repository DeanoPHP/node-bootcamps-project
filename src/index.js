async function fetchdata() {
    const response = await fetch('http://localhost:8080/api/v1/bootcamps');
    const data = await response.json();

    console.log(data);
}

fetchdata();

const slider = document.getElementById('slider').addEventListener('click', () => {
    document.querySelector('.left-slider').classList.toggle('active');
    document.getElementById('slider').style.width = '10%';
    document.querySelector('.heading-photo').classList.toggle('active');
});
