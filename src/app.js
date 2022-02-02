const path = require('path');
const express = require('express');
const request = require('postman-request');
const { ppid, allowedNodeEnvironmentFlags } = require('process');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forcast');

//console.log(__dirname);
//console.log(path.join(__dirname, '../public'));

//Define path for Express config
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

//Setup Static directory to serve
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Natalie'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Natalie'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Natalie',
        number: '20677788998'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }
    console.log(req.query.address);
    geocode(req.query.address, (error, { latitude, longitude, location}= {}) =>{
        if(error){
            return res.send({ error });
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: forecast(address),
    //     location: geocode(location),
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title : '404',
        name : 'Natalie',
        message: 'Help article not found'
    });
})


app.get('*', (req, res) => {
   res.render('404', {
    title : '404',
    name : 'Natalie',
    message: 'Page not found'
   })
})

app.listen(3000, () => {
    console.log('sever is up on port 3000.');
});

