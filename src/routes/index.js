const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../home/home', { title: 'Express'});
});

module.exports = router;