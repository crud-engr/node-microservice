const express = require('express');
const UserController = require('../controllers/UserController');
const UserPolicies = require('../Policies/policies');
const AuthMiddleware = require('../middleware/authMiddleware');

// initialize express router
const router = express.Router();

// all user routes
/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - username
 *                  - password
 *              properties:
 *                  username:
 *                      type: string
 *                      description: The individual username
 *                  password:
 *                      type: string
 *                      description: The user password
 *              example:
 *                  username: abeeb2020
 *                  password: password1234
 *          Thumbnail:
 *              type: object
 *              required:
 *                  - uri
 *              properties:
 *                  uri:
 *                      type: string
 *                      description: The url of the image to download
 *              example:
 *                  uri: https://res.cloudinary.com/dogxpnhoa/image/upload/v1636298434/node-image_q7b0d8.png
 *          JsonPatch:
 *              type: object
 *              required:
 *                  - firstName
 *                  - lastName
 *                  - contactNumber
 *                  - replacePath
 *                  - replaceValue
 *              properties:
 *                  firstName:
 *                      type: string
 *                      description: The first name
 *                  lastName:
 *                      type: string
 *                      description: The last name
 *                  contactNumber:
 *                      type: string
 *                      description: The contact number
 *                  replacePath:
 *                      type: string
 *                      description: The path to replace
 *                  replaceValue:
 *                      type: string
 *                      description: The value to replace in that path
 *              example:
 *                  firstName: John
 *                  lastName: Doe
 *                  contactNumber: 08130701854
 *                  replacePath: /firstName
 *                  replaceValue: Smith
 */

/**
 * @swagger
 *  tags:
 *      name: User
 *      description: What users can do
 */

/**
 * @swagger
 * /api/v1/login:
 *  post:
 *      description: Log in a user
 *      summary: Log in a user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          '200':
 *              description: Successfully logged in
 *          '400':
 *              description: Invalid syntax or Bad request
 *          '500':
 *              description: Server error
 */
router.route('/login').post([new UserPolicies().validateLogin], UserController.login);


// protect all routes after this middleware
router.use(AuthMiddleware.protect);
/**
 * @swagger
 * /api/v1/thumbnail:
 *  post:
 *      description: Create thumbnail
 *      summary: Download an image from the url and resize to 50 x 50
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Thumbnail'
 *      responses:
 *          '200':
 *              description: Successful
 *          '400':
 *              description: Invalid syntax or Bad request
 *          '500':
 *              description: Server error
 */

router.route('/thumbnail').post([new UserPolicies().validateThumbnail], UserController.createThumbnail);

/**
 * @swagger
 * /api/v1/patchObject:
 *  patch:
 *      description: Update an object with jsonpatch
 *      summary: Update an object with jsonpatch
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/JsonPatch'
 *      responses:
 *          '200':
 *              description: Successful
 *          '400':
 *              description: Invalid syntax or Bad request
 *          '500':
 *              description: Server error
 */
router.route('/patchObject').patch([new UserPolicies().validatePatchObject], UserController.patchJsonObject);

module.exports = router;