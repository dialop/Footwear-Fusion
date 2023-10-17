// Load .env data into process.env
require('dotenv').config();

// Dependencies
const express = require('express');
const morgan = require('morgan');
const cookieSession = require("cookie-session")
const bcrypt = require('bcrypt');

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

// 
app.use(
  cookieSession({
    name: "session",
    keys: [`key1`],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Diana Lopez- FAVORITES ROUTER
const favoritesRouter = require('./routes/favorites'); 


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

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
const productsRoutes = require('./routes/products');
const myProductsRoutes = require('./routes/myProducts');
const { getFilteredProducts } = require('./db/queries/filterProducts');



app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/favorites', favoritesRouter);
app.use('/myProducts', myProductsRoutes);


// -- GET ROUTE TO ACCESS FILTERED PRODUCTS -- //
app.get('/filterProducts', (req, res) => {
  console.log("Accessed /filterProducts"); 
  const products = req.query;

  getFilteredProducts(products)  //queries the products 
      .then(data => {
          res.json(data);
      })
      .catch(err => {
          console.error('Error fetching filtered products:', err);
          res.status(500).send('Internal Server Error');
      });
});


// Note: mount other resources here, using the same pattern above

// Home page
app.get('/', (req, res) => {
  res.render('index');
});







// Login GET route
app.get('/login', (req, res) => {
  res.render('login');
});

// Login POST route
// Login POST route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email, users);
  if (!user) {
    res.status(401).send('Invalid email or password');
  } else if (!bcrypt.compareSync(password, user.password)) {
    res.status(401).send('Invalid email or password');
  } else {
    req.session.user_id = user.id;
    res.redirect('/products');
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