const request = require('request')

const forecast = (longitude ,latitude, callback)=>{
    
    const url ='https://api.openweathermap.org/data/2.5/onecall?lon='+encodeURIComponent(longitude)+'&lat='+encodeURIComponent(latitude)+'&exclude=daily&units=metric&appid=a41608c244ccdbc532fc85c2769141ac' 
    
    request({ url, json:true},(error , {body})=>{
        
      
        if(error)
        {
           callback('Unable to connect to location service !',undefined) 
        }
        else if(body.cod===400)
        {
           callback('Unable to find location . Try another search',undefined)
        }
        else
        {
           callback(undefined,{
           des:'There is '+ body.current.temp+' degrees(currently) out there. ('+  body.current.weather[0].description+')',
           des1:'Hourly :'+body.hourly[0].temp +' degrees'

         })
        }
    })

}

module.exports= forecast