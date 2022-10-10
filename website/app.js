/* Global Variables */
const baseLink = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=fe7ad27a476129f711459d73facb6b84&units=metric';
const generateBtn = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let date = new Date ();
let newDate = date.getMonth() + 1 + '.' + date.getDate() + '.' + date.getFullYear();
function start(x) {
    const zipCode = document.querySelector('#zip').value;
    const feel = document.querySelector('#feelings').value;
    console.log(newDate);

    Temperature(baseLink, zipCode, key)
        .then(function (info) {
        // Add data to POST request
            postInfo('/postData', { temperature: info.main.temp, date: newDate, user_response: feel })
            update();
        })
};
generateBtn.addEventListener('click', start);
// Async GET
const Temperature = async (baseLink, zipCode, key) => {
    const response = await fetch(`${baseLink}${zipCode}${key}`)
    console.log(response);
    try {
        const info = await response.json();
        console.log(info.main.temp);
        console.log('success');
        return info;
    }
    catch (error) {
        console.log('error', error);
    }
};

// Async POST
const postInfo = async (link = '', info = {}) => {
    const req = await fetch(link, {
        method: "POST",
        credentials: "same-origin",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(info),
    });
    try {
        const newInfo = await req.json();
        console.log(newInfo);
        return newInfo;
    }
    catch (error) {
        console.log('Error', error);
    }
};

// Update UI
const update = async () => {
    const request = await fetch('http://localhost:5000/addData');
    try {
        const updateData = await request.json();
        console.log(updateData);
        document.querySelector('#date').innerHTML = updateData.date;
        document.querySelector('#temp').innerHTML = updateData.temperature + '<sup>°</sup>C';
        document.querySelector('#content').innerHTML = updateData.user_response;
    }
    catch (error) {
        console.log('Error', error);
// appropriately handle the error
    }
};
