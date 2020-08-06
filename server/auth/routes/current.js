const router = require('express').Router();
const auth = require('../checkAuth');

function current(model) {
    return router.get('/current', auth(model), (req, res) => {
        res.status(200).send({
            user: req.user
        });
    });
}

module.exports = current;