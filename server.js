const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


//add partial views directory
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log +'\n', (err)=>{
        if(err) console.log('Unable to append to server.log');
    });
    next();
});

app.use((req,res,next)=>{
    res.render('maintenance');
});
//allow express to serve contents in the public folder
app.use(express.static(__dirname + '/public'));

//register a function to use in the view
hbs.registerHelper('getCurrentYear', ()=> new Date().getFullYear());
hbs.registerHelper('screamIt', (text)=> text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page'
    });
});


app.listen('3000');