const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=856979d4e8ceb061b1d5437c576b0f72&query=' + latitude + ',' + longitude + '&units = f';

    request({ url, json : true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error){
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out. ' +  'The humidity is ' + body.current.humidity + 'percent.');
        }
    })
}

module.exports = forecast;
