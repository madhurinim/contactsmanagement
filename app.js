const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myconnection = require('express-myconnection');
const express = require('express');
const app = express();

//rutas
const contactRoutes = require('./routes/contact')

app 
    //configuraciones
    .set('port', process.env.PORT || 3000)
    .set('view engine','ejs')
    .set('views', path.join(__dirname,'views'))
    
    //midleware
    .use(morgan('dev'))
    .use(myconnection(mysql,{
        host:'localhost',
        user: 'root',
        password: 'MS@2october',
        port: '3306',
        database: 'contdb'
    }, 'single'))
    .use(express.urlencoded({extended:false}))

    //ROUTES
    .use('/',contactRoutes)

    //static files
    .use(express.static(path.join(__dirname,'public')))

    .listen(app.get('port'),()=>{
        console.log('service on 3000')
    });