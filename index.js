// import environment variables
require('dotenv').config();

// import express libraries and filestructure traversal
const express = require('express');
const session = require('express-session');

// middleware
const {authMiddleware} = require('./middleware/auth.middleware');

// routes
const personsRoutes = require('./persons/PersonsRoutes');

// app
const app = express();

// view engine setup
app.set('view engine', 'ejs');

// parse form data
app.use(express.urlencoded({extended: true}));
// parse JSON data
app.use(express.json());
// session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);
// session-protection middleware
app.use(authMiddleware);

// attach route modules
app.use('/persons', personsRoutes);

// root route
app.get('/', (req, res) => {
  res.render('index');
})

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('The server is listening...');
  console.log(`Visit your site at http://localhost:${port}`);
});