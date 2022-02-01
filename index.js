var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const key = '68c613f14db19e066c4d03f0bf56c5f3';

app.get('/', function (req, res) {
    let city = 'Tartu';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let description = data.weather[0].description;
            let city = data.name;
            let temp = Math.round(parseFloat(data.main.temp) -273.15);
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
})

app.post('/', function (req, res) {
    let city = req.body.cityname
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let description = data.weather[0].description;
            let city = data.name;
            let temp = Math.round(parseFloat(data.main.temp) -273.15);
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
})

app.listen(3000);