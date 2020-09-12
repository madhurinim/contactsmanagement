const express = require('express');
const router = express.Router();

const contactController = require('../controller/contactController')

router
    .get('/', contactController.list)
    .post('/add', contactController.save)
    .get('/delete/:id',contactController.delete)
    .get('/search',contactController.search)
    .get('/update/:id',contactController.edit)
    .post('/update/:id',contactController.update)
    .post('/key',contactController.key)
    module.exports = router;