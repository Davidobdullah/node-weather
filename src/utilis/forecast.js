const request = require('request')

const forecast = (latitude ,longitude, callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=9f14edadc14132c75ea99481a669add2&query='+latitude+','+longitude+ '&units=m'
  request({url:url , json:true}, (error,response)=>{
  if(error){
    callback('unable to connect to local network', undefined) 
  }
   if(response.body.error){
    callback ('unable to find location please provide another', undefined)
   }
   else{
  callback(undefined, response.body.current.weather_descriptions[0] + " , it is " + response.body.current.temperature + " outside and feels like " + response.body.current.feelslike)
   }
  })


}

module.exports = forecast