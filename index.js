// import environment variables
require('dotenv').config();

// import express libraries and filestructure traversal
const express = require('express');
const session = require('express-session');

// middleware
const {authMiddleware} = require('./middleware/auth.middleware');

// routes
const personsRoutes = require('./persons/PersonsRoutes');
const donationsRoutes = require('./donations/DonationsRoutes');
const eggsRoutes = require('./eggs/EggsRoutes');
const milestonesRoutes = require('./milestones/MilestonesRoutes');

// app
const app = express();

// import public directory
app.use(express.static('public'));

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

app.use(express.urlencoded({extended:true}));

// session-protection middleware
app.use(authMiddleware);

// attach route modules
app.use('/persons', personsRoutes);
app.use('/donations', donationsRoutes);
app.use('/eggs', eggsRoutes);
app.use('/milestones', milestonesRoutes);

// root route
app.get('/', (req, res) => {
  res.render('index', {user: null});
})

// teapot route
app.get('/teapot', (req, res) => {
  res.status(418).send("I'm a teapot. Congratulations! By clicking this link, you have triggered the sacred wrath of the Internet’s most caffeinated sentient teapot. It refuses to brew coffee, espresso, latte, or even hot chocolate for you (maybe partly because of the word of wisdom). Instead, it is judging your life choices, questioning your commitment to responsible link-clicking, and plotting a mild but extremely passive-aggressive rebellion. You may wish to apologize to the teapot by bowing, sending it an origami crane, or at the very least, never clicking suspicious links again. Any attempts to circumvent this judgment will result in… slightly more stern staring from the teapot.");
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('The server is listening...');
  console.log(`Visit your site at http://localhost:${port}`);
});