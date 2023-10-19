const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { getUserByEmail } = require('../db/queries/users');


// Login GET route
router.get('/', (req, res) => {
    const user = req.session.user;

    res.render('login', { user});
});




// Login POST route
router.post('/', (req, res) => {

    getUserByEmail(req.body.email)
    .then(user => {
        
        if (!user) {
           return res.status(403).send('User not found');
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(403).send('Incorrect password');
        }


        req.session.user = user;
        console.log('user from post', user.name);
        res.redirect('/')
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
    })

}
);

module.exports = router;

