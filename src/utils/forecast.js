const request = require('postman-request');

const forecast = (latitude, longitude, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=05b4b362962fc13c84d63d3bc566ec38&query=${latitude},${longitude}`;
    
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather API',undefined);
        }else if(body.error){
            callback('Wrong coordinates',undefined);
        }else{
            callback(undefined,`${body.current.weather_descriptions}. It's currently ${body.current.temperature} and it feels like ${body.current.feelslike}`);
        }
    });
}

  module.exports = forecast;