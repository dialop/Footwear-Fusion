const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  console.log('it is products');
  res.render('products')
});

module.exports = router;