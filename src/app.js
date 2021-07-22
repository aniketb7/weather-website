const path = require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')


const app = express()
const port =process.env.PORT|| 3000
//Define Paths for Express config   
const publicDirPath =path.join(__dirname , '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and view location
app.set('view engine','hbs') 
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static  directory  to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name : 'Aniket',
        
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
      title:'About Me',
      name: 'Aniket',
      
    })
})

app.get('/products',(req, res)=>{
     if(!req.query.search){
             res.send({
            error:'You must provide a search term'
        })
     }
    console.log(req.query)
     res.send({
        products:[]
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This is some helpful Text',
        title: 'Help',
        name :'Aniket',
        
    })
})


// weather 
app.get('/weather',(req, res)=>{
    
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address !'
        })
    }
 
    const placeName = req.query.address
    geocode(placeName,(error,{longitude , latitude, location}={})=>{
        if(error)
        {
            return res.send({
                error
            })
        }
       forecast(longitude , latitude, (error, forecast) => {
          if(error)
          {
            return res.send({error})
          }
       
        
        res.send({
            des:forecast.des,
            location,
            address : req.query.address
        })
        
      })
     })
     
   
})

app.get('/help/*',(req,res)=>{
     res.render('404',{
        title:'404 Help',  
        name:'Aniket',
        errorMessage :'Help article not found'
     })
})

// 404
app.get('*',(req,res)=>{
     res.render('404',{
        title:'404 ',  
        name:'Aniket',
         errorMessage:'Page not found'
     })
})


app.listen(port,()=>{
    console.log('Server is up on port '+port)
})