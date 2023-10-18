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

//Diana
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],  // You should use environment variables for real-world applications
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


//Diana
const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }
  next();
};
//Diana L
app.use('/favorites', requireLogin);
app.use('/messages', requireLogin);
// Add other routes you want to secure


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


// Routes
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const myProductsRoutes = require('./routes/myProducts');
const { getFilteredProducts } = require('./db/queries/filterProducts');
const { sendMessage, getAllMessages } = require('./db/queries/messages'); 
const { getFavoritesForUser } = require('./db/queries/markFavorite');
const { markAsFavorite } = require('./db/queries/markFavorite');
const loginRouter = require('./db/queries/users');




app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/myProducts', myProductsRoutes);




//-- GET ENDPOINT USER FAVORITE PRODUCTS --//
app.get('/favorites', async (req, res) => {
  try {
    const favorites = await getFavoritesForUser();
    res.render('favorites', {
      favorites: favorites,
     
    });
  } catch (error) {
    console.error(error); 
    res.status(500).send(`Server error: ${error.message}`);
  }
});


app.post('/add-to-favorites', async (req, res) => {
  const productId = req.body.productId;

  try {
    await markAsFavorite(productId);
    res.redirect('/favorites');
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).send('Internal Server Error');
  }
});


// -- GET ENDPOINT SEND MESSAGES -- //
app.get('/messages', async (req, res) => {
  try {
      const messages = await getAllMessages();
      res.render('messages', { messages: messages });
  } catch (error) {
      res.status(500).send('Error retrieving messages');
  }
});

// -- POST ENDPOINT SEND MESSAGES -- //
app.post('/send-message', async (req, res) => {
  const { sender_id, receiver_id, product_id, message } = req.body;

  try {
      await sendMessage({ sender_id, receiver_id, product_id, message });
      res.redirect('/messages'); // Redirect back to the messages page.
  } catch (error) {
      res.status(500).send('Error sending message');
  }
});


// -- GET ENDPOINT TO ACCESS FILTERED PRODUCTS -- //
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

//Diana L
//Login POST Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch the user by email from the database
    const user = await getUserByEmail(email);

    if (user) {
      // Compare the hashed password stored in the database with the password provided by the user
      if (bcrypt.compareSync(password, user.password)) {
        // Store user id in the session
        req.session.user_id = user.id;
        res.redirect('/');
      } else {
        res.status(403).send('Invalid password');
      }
    } else {
      res.status(403).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//Diana L
// Register GET Endpoint
app.get('/register', (req, res) => {
  res.render('register');
});

// Register POST Endpoint
app.post('/register', async (req, res) => { 
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('Please fill out all fields'); 
  }

  if (await getUserByEmail(email)) {
    return res.status(400).send('User already exists'); 
  }

  const id = generateRandomString();
  const user = {name, email, password};

  await db.query('INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)', [name, email, password]);

  req.session.user_id = id;
  res.redirect('/'); 
});

// Logout POST Endpoint
app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

// Helper functions
const generateRandomString = function() {
  return Math.random().toString(36).substring(2, 8);
};

// Diana L
const getUserByEmail = (email, users) => {
  return users.find((user) => user.email === email) || null;
};


// Server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});