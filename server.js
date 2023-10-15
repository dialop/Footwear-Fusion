// Load .env data into process.env
require('dotenv').config();

// Dependencies
const express = require('express');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configure SASS middleware
const sassMiddleware = require('./lib/sass-middleware');
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);

// User data (consider moving this to a separate file)
const users = [
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password123',
    isAdmin: false,
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    password: 'password456',
    isAdmin: true,
  },
  {
    name: 'Bob Smith',
    email: 'bobsmith@example.com',
    password: 'password789',
    isAdmin: false,
  },
];

// Routes
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');

app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Login GET route
app.get('/login', (req, res) => {
  res.render('login');
});

// Login POST route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email); // Check if email is received
  const user = getUserByEmail(email, users);
  console.log('User:', user); // Check the user found
  if (!user) {
    res.status(403).send('User does not exist');
  } else if (!bcrypt.compareSync(password, user.password)) {
    res.status(403).send('Incorrect password');
  } else {
    req.session.user_id = user.id;
    res.redirect('/');
  }
});


// Register GET route
app.get('/register', (req, res) => {
  res.render('register');
});

// Register POST route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).send('Please fill out all fields');
  } else if (getUserByEmail(email, users)) {
    res.status(400).send('User already exists');
  } else {
    const id = generateRandomString();
    const user = { id, name, email, password };
    users.push(user); // Append the new user to the array
    req.session.user_id = id;
    res.redirect('/'); // Redirect to the homepage after successful registration
  }
});

// Logout POST route
app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

// Helper functions
const generateRandomString = function() {
  return Math.random().toString(36).substring(2, 8);
};

const getUserByEmail = (email, users) => {
  return users.find((user) => user.email === email) || null;
};

// Server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
