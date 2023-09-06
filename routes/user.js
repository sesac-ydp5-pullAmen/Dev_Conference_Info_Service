const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

router.get('/signup', controller.getSignup);
router.post('/signup', controller.postSignup);

router.get('/profile', controller.getProfile);
router.patch('/profile/edit', controller.patchProfile);
router.delete('/destroy', controller.deleteUser);

module.exports = router;