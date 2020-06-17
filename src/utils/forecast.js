const request = require('request')

const forecast = (latitude, longitude ,callback) => {

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=0d1050a2611701cef41ad4dd99dc1c8c'
   request({url, json : true }, ( error, {body}={} ) =>{
      
     
     if(error)
     {
       callback('Unable to connect to weather services!', undefined)
     }
     else if(body.main.error)
     {
        callback('Unable to find weather location. Try another search', undefined)
     }else{
       callback(undefined, 'It is currently '+ body.main.temp + ' degrees out'+ ' There is '+ body.main.humidity+'%'+' chance of rain')
     }
   })
  }
 module.exports = forecast