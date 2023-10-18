// Load .env data into process.env
require('dotenv').config();

// Dependencies
const express = require('express');
const morgan = require('morgan');
const cookieSession = require("cookie-session");
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
const myProductsRoutes = require('./routes/myProducts');
const { getFilteredProducts } = require('./db/queries/filterProducts');
const { sendMessage, getAllMessages } = require('./db/queries/messages');
const { getFavoritesForUser } = require('./db/queries/markFavorite');
const { markAsFavorite } = require('./db/queries/markFavorite');
const { deleteFavorite } = require('./db/queries/delete-favorite');
const { addToFavorites } = require('./db/queries/add-favorite');

app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/login', loginRouter);
app.use('/myProducts', myProductsRoutes);


//-- GET ENDPOINT USER FAVORITE PRODUCTS --//
app.get('/favorites', async(req, res) => {
  try {
    let favorites = await getFavoritesForUser();
    // Filter out products with null descriptions
    favorites = favorites.filter(product => product.description !== null);
    res.render('favorites', {
      favorites: favorites
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Server error: ${error.message}`);
  }
});

//-- POST ENDPOINT DELETE PRODUCTS --//
app.post('/favorites/:id/delete', (req, res) => {
  const productId = req.params.id;

  deleteFavorite(productId)
    .then(() => {
      // Send a response indicating success
      res.status(200).json({ message: 'Favorite deleted successfully' });
    })
    .catch((error) => {
      // Handle any errors that occur during deletion
      console.error('Error deleting favorite:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


//-- GET ENDPOINT ADDING FAVORITE PRODUCTS --//
app.get('/favorites', async(req, res) => {
  try {
    const userId = req.session.user_id || null;
    const favorites = await getFavoritesForUser(userId);
    res.render('favorites', { favorites: favorites });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//-- POST ENDPOINT ADDING FAVORITE PRODUCTS --//
app.post('/favorites', async(req, res) => {
  const productId = req.body.id;
  const userId = 2; //  hardcoded ID value

  try {
    await addToFavorites(productId, userId);
    res.redirect('/favorites');
  } catch (error) {
    console.error('Error adding product to favorites:', error);
    res.status(500).send('Internal Server Error');
  }
});

// -- GET ENDPOINT SEND MESSAGES -- //
app.get('/messages', async(req, res) => {
  try {
    const messages = await getAllMessages();
    res.render('messages', { messages: messages });
  } catch (error) {
    res.status(500).send('Error retrieving messages');
  }
});

// -- POST ENDPOINT SEND MESSAGES -- //
app.post('/send-message', async(req, res) => {
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
// Register GET Endpoint
app.get('/register', (req, res) => {
  res.render('register');
});

// Register POST Endpoint
app.post('/register', async(req, res) => {
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





// Server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});