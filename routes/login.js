const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { getUserByEmail } = require('../db/queries/users');


// Login GET route
router.get('/', (req, res) => {
    res.render('login');
});


// Login POST route
router.post('/', (req, res) => {

    getUserByEmail(req.body.email).then(user => {
        
        if (!user) {
           return res.status(403).send('User not found');
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(403).send('Incorrect password');
        }

        res.cookie('user_id', user.id);
        res.redirect('/products');
    })

}
);

module.exports = router;

