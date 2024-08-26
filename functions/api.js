const express = require('express');
const serverless = require('serverless-http');
const app = express();
// const router = require('../routes/allRoutes');
const path = require('path');
const https = require("https");
const fs = require("fs");
const morgan = require("morgan");
const helmet = require("helmet");
const ejs = require('ejs');
const cors = require("cors");
app.use(cors());
app.use(express.json());
const router =  require('../routes/allRoutes')
app.use(helmet());
app.use(express.static(path.join(__dirname, "../public")));       
// app.use('/.netlify/functions/api', router);

app.set("view engine", "ejs");
// app.set('views', path.join(__dirname, '../views'));
app.set('views', path.join(__dirname, '../views'));
app.use((req, res, next) => {
    console.log('Current path:', req.path);  // Log the current path
    res.locals.activeRoute = req.path;
    console.log('Active route set to:', res.locals.activeRoute);  // Log the active route
    next();
  });

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'" ,'https://maps.gstatic.com'],
        frameSrc: ["'self'", 'https://www.google.com/'],
      },
    })
  );


app.use('/' , router)


app.get('/', (req, res) => {
    console.log('Rendering dashboard view');
   return res.render('dashboard/dashboard' , {message:""});
});

const handler = serverless(app);
module.exports.handler = async (event, context) => {
    try {
        const result = await handler(event, context);
        return result;
    } catch (error) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};

