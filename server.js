// Load .env data into process.env
require('dotenv').config();

// Dependencies
const express = require('express');
const morgan = require('morgan');

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
app.use(express.static('public'));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own



// Routes
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const loginRouter = require('./routes/login');
const favoritesRouter = require('./routes/favorites');


app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/favorites', favoritesRouter);
app.use('/login', loginRouter);

// Note: mount other resources here, using the same pattern above

// Home page
app.get('/', (req, res) => {
  res.render('index');
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



// Server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
