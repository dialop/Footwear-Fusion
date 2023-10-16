// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Diana Lopez- FAVORITES ROUTER
const favoritesRouter = require('./routes/favorites'); 


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const myProductsRoutes = require('./routes/myProducts');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/favorites', favoritesRouter);
app.use('/myProducts', myProductsRoutes);


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


// Abdiranman: Login GET route
app.get('/login', (req, res) => {
  res.render('login');
});

// Abdiranman: Login POST route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email, users);
  if (!user) {
    res.status(403).send('User not found');
  } else if (user.password !== password) {
    res.status(403).send('Incorrect password');
  } else {
    req.session.user_id = user.id;
    res.redirect('/'); // Redirect to the homepage after successful login
  }
});


// Abdiranman: Register GET route
app.get('/register', (req, res) => {
  res.render('register');
});

// Abdiranman: Register POST route
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send('Email or password cannot be empty');
  } else if (getUserByEmail(email, users)) {
    res.status(400).send('Email already exists');
  } else {
    const id = generateRandomString();
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
    const newUser = {
      id,
      email,
      password: hashedPassword, // Store the hashed password in the database
    };
    users[id] = newUser;
    req.session.user_id = id;
    res.redirect('/login'); // Redirect to the login page after successful registration
  }
});


// Abdiranman: Logout POST route
app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

// Abdiranman: generateRandomString helper function
const generateRandomString = function() {
  return Math.random().toString(36).substring(2, 8);
};

// Abdiranman: getUserByEmail helper fucntion
const getUserByEmail = function(email, database) {
  for (const user in database) {
    if (database[user].email === email) {
      return database[user];
    }
  }
  return false;
};

