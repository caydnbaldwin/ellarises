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
const surveysRoutes = require('./surveys/SurveysRoutes');
const eventsRoutes = require('./events/EventsRoutes');

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
app.use('/surveys', surveysRoutes);
app.use('/events', eventsRoutes);

// root route
app.get('/', (req, res) => {
  res.render('index', {errorMessage: null, person: req.session.person ? req.session.person : null});
})

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('The server is listening...');
  console.log(`Visit your site at http://localhost:${port}`);
});