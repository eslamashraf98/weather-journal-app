/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = '&appid=fe7ad27a476129f711459d73facb6b84&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    getTemperature(baseURL, zipCode, apikey)
        .then(function (data) {
        // Add data to POST request
            postData('http://localhost:8080/addWeatherData', { temperature: data.main.temp, date: newDate, user_response: feelings })
        // Function which updates UI
                .then(function () {
                    updateUI()
                })
        })
}

// Async GET
const getTemperature = async (baseURL, zipCode, apikey) => {
    // const getTemperatureDemo = async (url)=>{
    const response = await fetch(baseURL + zipCode + apikey)
    // console.log(response);
    try {
        const data = await response.json();
        console.log(data.main.temp);
        console.log('success');
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
};

// Async POST
const postData = async (URL = '', data = {}) => {
    const req = await fetch(URL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await req.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
};

// Update user interface
const updateUI = async () => {
    const request = await fetch('http://localhost:8080/All');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature + '<sup>°</sup>C';
        document.getElementById('content').innerHTML = allData.user_response;
    }
    catch (error) {
        console.log('error', error);
    }
};

document.getElementById('generate').addEventListener('click', performAction);
