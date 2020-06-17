const express = require('express')
const path = require('path')
const app = express();
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


//Define path for express config
const publicDir = path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Set up static directory
app.use(express.static(publicDir))

//Set up handlebars view engine
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Charles Obekpa'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        helpTxt:'This is the help page',
        name:'Charles Obekpa'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Charles Obekpa'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address, (error,{latitude, longitude, location}={})=>{
        if(error){
           return  res.send({
                error
            })
        }
            forecast(latitude, longitude, (error, forecastData)=>{
                if(error){
                 return   res.send({
                        error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address:req.query.address
                })
            })
        
    })
    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'Charles Obekpa',
        title:'404',
        errorMsg:'Help article not found'
    })
})
//404 page goes here
app.get('*',(req,res)=>{
    res.render('404',{
        name:'Charles Obekpa',
        title:'404',
        errorMsg:'404 page not found'
    })
})
app.listen(3000, ()=>{
    console.log('Server is listening at port 3000....');
})

