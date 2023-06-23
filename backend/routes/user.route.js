const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.get('/test', user_controller.test); // testing route

router.post('/', user_controller.user_create);

router.get('/', user_controller.fetch_user);

router.delete('/:id', user_controller.remove_user);

router.post('/:id', user_controller.edit_user);

module.exports = router;