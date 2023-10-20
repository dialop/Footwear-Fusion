// ---- REGISTER ROUTER ---- //

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


// Register GET route
router.get('/', (req, res) => {
    const user = req.session.user;
    res.render('register', { user });
});

const { getUserByEmail, addUser } = require('../db/queries/users');

// Register POST route
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    getUserByEmail(email)
        .then(user => {
            if (user) {
                return res.status(400).send('User already exists');
            }

            // Add user to database
            const hashedPassword = bcrypt.hashSync(password, 10);
            console.log('hashedPassword____:', hashedPassword)
            addUser(name, email, hashedPassword)
                .then(user => {
                    res.cookie('user_id', user.id);
                    res.redirect('/products');
                })
                .catch(err => {
                    console.error('Error adding user to database:', err);
                    res.status(500).send('Internal Server Error');
                });
        })
        .catch(err => {
            console.error('Error retrieving user from database:', err);
            res.status(500).send('Internal Server Error');
        })
        
    });

module.exports = router;