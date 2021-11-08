const express = require('express');
const UserController = require('../controllers/UserController');
const UserPolicies = require('../Policies/policies');
const AuthMiddleware = require('../middleware/authMiddleware');

// initialize express router
const router = express.Router();

// all user routes
router.route('/login').post([new UserPolicies().validateLogin], UserController.login);

// protect all routes after this middleware
router.use(AuthMiddleware.protect);
router.route('/thumbnail').post([new UserPolicies().validateThumbnail], UserController.createThumbnail);
router.route('/patchObject').patch([new UserPolicies().validatePatchObject], UserController.patchJsonObject);

module.exports = router;