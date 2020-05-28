const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000 ;
//Define paths for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Mahmoud Ezz',
    });
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Mahmoud Ezz',
    });
})
app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'this is a help message',
        title: 'Help',
        name: 'Mahmoud Ezz',
    });
})
app.get('/weather',(req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address',
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        }); 
    })
})
app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            errorMessage: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res)=>{
    res.render('404',{
        message: '404 help page not found',
        title: '404',
        name: 'Mahmoud',
    })
})
app.get('*', (req, res)=>{
    res.render('404',{
        errorMessage: '404 page not found',
        title: '404',
        name: 'Mahmoud',
    });
})



app.listen(port, ()=>{
    console.log(`Server is listning on port ${port} ...`);
})