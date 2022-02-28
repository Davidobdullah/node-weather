  const request = require('request')

const geocode = (address , callback)=>{

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGF2eWRhd29vZCIsImEiOiJja3lqejN4dGgycmhtMnBwODR5eGJxZXBtIn0.27qfeKReViS_2L71EKmAWw&limit=1'
    
  
    request ({url:url , json:true} , (error, response)=>{
        if(error){
   callback('unable to connect to local network', undefined)       // first argument is error i-e why unable to ,2nd arg is data (erroe present so data undefined)
        }
        if (response.body.features.length === 0){
            callback ('unable to find location please provide another', undefined)
        }
        else{
            callback(undefined, {
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0]
            })
        }
        
    })
  }

  module.exports = geocode