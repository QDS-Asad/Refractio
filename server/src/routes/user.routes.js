const express = require("express");
const router = express.Router();
const User = require("../controllers/user.controller");
const { validateAcceptInvite } = require("../middlewares/acceptInvite");
const Auth = require("../middlewares/auth");
const { validateChangeName } = require("../middlewares/changeName");
const { validateChangeTeamName } = require("../middlewares/changeTeamName");
const { validateInvite } = require("../middlewares/inviteUser");
const { validateLogin } = require("../middlewares/login");
const { validateChangePaymentMethod } = require("../middlewares/paymentMethod");
const { validateRegister } = require("../middlewares/register");
const { validateResetPassword } = require("../middlewares/resetPassword");
const { validatePostLogin } = require("../middlewares/selectTeam");
const { validateSubscribe } = require("../middlewares/subscribe");

/**
 * @swagger
 *   /api/users/register:
 *   post:
 *     description: register new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   Register:
 *    type: object
 *    required:
 *      - firstName
 *      - lastName
 *      - email
 *      - password
 *    properties:
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      email:
 *        type: string
 *      password:
 *        type: string
 */
router.post("/register", validateRegister, User.register);

/**
 * @swagger
 *   /api/users/verify-register:
 *   post:
 *     description: verify registering user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyRegister'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   VerifyRegister:
 *    type: object
 *    required:
 *      - userId
 *      - otp
 *    properties:
 *      userId:
 *        type: string
 *      otp:
 *        type: string
 */
router.post("/verify-register", User.verifyToken);

/**
 * @swagger
 *   /api/users/resend-verify-code:
 *   post:
 *     description: resend verify code
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReVerify'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   ReVerify:
 *    type: object
 *    required:
 *      - userId
 *      - email
 *    properties:
 *      userId:
 *        type: string
 *      email:
 *        type: string
 */
router.post("/resend-verify-code", User.resendToken);

/**
 * @swagger
 *   /api/users/login:
 *   post:
 *     description: login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   Login:
 *    type: object
 *    required:
 *      - email
 *      - password
 *      - rememberMe
 *    properties:
 *      email:
 *        type: string
 *      password:
 *        type: string
 *      rememberMe:
 *        type: boolen
 */
router.post("/login", validateLogin, User.login);

/**
 * @swagger
 *   /api/users/user-teams:
 *   get:
 *     description: get user team list
 *     tags: [User]
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.get("/user-teams", Auth, User.getUserTeams);

/**
 * @swagger
 *   /api/users/select-team:
 *   post:
 *     description: select login user team
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostLogin'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   PostLogin:
 *    type: object
 *    required:
 *      - team
 *    properties:
 *      team:
 *        type: string
 */
router.post("/select-team", Auth, validatePostLogin, User.selectTeam);

/**
 * @swagger
 *   /api/users/forget-password:
 *   post:
 *     description: login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPassword'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   ForgotPassword:
 *    type: object
 *    required:
 *      - email
 *    properties:
 *      email:
 *        type: string
 */
router.post("/forget-password", User.forgetPassword);

/**
 * @swagger
 *   /api/users/reset-password/{token}:
 *   put:
 *     description: login user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *     schema:
 *        type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   ResetPassword:
 *    type: object
 *    required:
 *      - newPassword
 *      - confirmPassword
 *    properties:
 *      newPassword:
 *        type: string
 *      confirmPassword:
 *        type: string
 */
router.put("/reset-password/:token", validateResetPassword, User.resetPassword);

/**
 * @swagger
 *   /api/users/delete/{userId}:
 *   delete:
 *     description: cancel invited user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *     schema:
 *        type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.delete("/delete/:userId", Auth, User.disableUser);

/**
 * @swagger
 *   /api/users/remove-my-account:
 *   delete:
 *     description: cancel invited user
 *     tags: [User]
 *     schema:
 *        type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.delete("/remove-my-account", Auth, User.disableMyAccount);

/**
 * @swagger
 *   /api/users/list:
 *   get:
 *     description: get all users
 *     tags: [User]
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: integer
 *        - in: query
 *          name: page_size
 *          schema:
 *              type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   Team:
 *    type: object
 *    properties:
 *      page:
 *        type: number
 *      page_size:
 *        type: number
 */
router.get("/list", Auth, User.getAllUsers);

/**
 * @swagger
 *   /api/users/user-details/{userId}:
 *   get:
 *     description: user details
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *     schema:
 *        type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.get("/user-details/:userId", Auth, User.getUserById);


//Team specific user routes

/**
 * @swagger
 *   /api/users/invite-account:
 *   post:
 *     description: invite new user
 *     tags: [Team]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invite'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   Invite:
 *    type: object
 *    required:
 *      - email
 *      - roleId
 *    properties:
 *      email:
 *        type: string
 *      roleId:
 *        type: number
 */
router.post("/invite-account", Auth, validateInvite, User.inviteUser);

/**
 * @swagger
 *   /api/users/verify-invite-account/{token}/{teamId}:
 *   get:
 *     description: get invited user info
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: token
 *       - in: path
 *         name: teamId
 *     schema:
 *        type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 */
router.get("/verify-invite-account/:token/:teamId", User.verifyEmailInvite);

/**
 * @swagger
 *   /api/users/register-invite-account/{userId}/{teamId}:
 *   put:
 *     description: accept user invite and register
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: userId
 *       - in: path
 *         name: teamId
 *     schema:
 *        type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AcceptUserInvite'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   AcceptUserInvite:
 *    type: object
 *    required:
 *      - email
 *      - firstName
 *      - lastName
 *      - newPassword
 *      - confirmPassword
 *    properties:
 *      email:
 *        type: string
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      newPassword:
 *        type: string
 *      confirmPassword:
 *        type: string
 */
router.put("/register-invite-account/:userId/:teamId", validateAcceptInvite, User.inviteRegister);

/**
 * @swagger
 *   /api/users/join-team/{userId}/{teamId}:
 *   put:
 *     description: join team
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: userId
 *       - in: path
 *         name: teamId
 *     schema:
 *        type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AcceptUserInvite'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   AcceptUserInvite:
 *    type: object
 *    required:
 *      - email
 *      - firstName
 *      - lastName
 *      - newPassword
 *      - confirmPassword
 *    properties:
 *      email:
 *        type: string
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      newPassword:
 *        type: string
 *      confirmPassword:
 *        type: string
 */
router.put("/join-team/:userId/:teamId", User.joinTeam);

/**
 * @swagger
 *   /api/users/resend-invite-account/{userId}:
 *   put:
 *     description: accept user invite and register
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: userId
 *     schema:
 *        type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.put("/resend-invite-account/:userId", Auth, User.resendInvite);

/**
 * @swagger
 *   /api/users/change-team-name:
 *   put:
 *     description: update user role
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/changeTeamName'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 * components:
 *  schemas:
 *   changeName:
 *    type: object
 *    required:
 *      - name
 *    properties:
 *      name:
 *        type: string
 */
router.put("/change-team-name", Auth, validateChangeTeamName, User.changeTeamName);

/**
 * @swagger
 *   /api/users/update-user-role/{userId}/{roleId}:
 *   put:
 *     description: update user role
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: userId
 *       - in: path
 *         name: roleId
 *     schema:
 *        type: stirng
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.put("/update-user-role/:userId/:roleId", Auth, User.updateUserRole);

/**
 * @swagger
 *   /api/users/cancel-invite-account/{userId}:
 *   delete:
 *     description: cancel invited user
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: userId
 *     schema:
 *        type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.delete("/cancel-invite-account/:userId", Auth, User.cancelUserInvite);

/**
 * @swagger
 *   /api/users/team:
 *   get:
 *     description: get team
 *     tags: [Team]
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: integer
 *        - in: query
 *          name: page_size
 *          schema:
 *              type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   Team:
 *    type: object
 *    properties:
 *      page:
 *        type: number
 *      page_size:
 *        type: number
 */
router.get("/team", Auth, User.getTeam);

/**
 * @swagger
 *   /api/users/all-team:
 *   get:
 *     description: get team
 *     tags: [Team]
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: integer
 *        - in: query
 *          name: page_size
 *          schema:
 *              type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   Team:
 *    type: object
 *    properties:
 *      page:
 *        type: number
 *      page_size:
 *        type: number
 */
router.get("/all-team", Auth, User.getAllTeams);

/**
 * @swagger
 *   /api/users/team-users/{teamId}:
 *   get:
 *     description: user details
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: teamId
 *     schema:
 *        type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.get("/team-users/:teamId", Auth, User.getUsersByTeamId);

/**
 * @swagger
 *   /api/users//team-administrators:
 *   get:
 *     description: get team
 *     tags: [Team]
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
 router.get("/team-administrators", Auth, User.getTeamAdmins);

/**
 * @swagger
 *   /api/users//team-members:
 *   get:
 *     description: get team members without slef
 *     tags: [Team]
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
 router.get("/team-members", Auth, User.getTeamMembers);

/**
 * @swagger
 *   /api/users/change-name:
 *   put:
 *     description: update user role
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/changeName'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 * components:
 *  schemas:
 *   changeName:
 *    type: object
 *    required:
 *      - firstName
 *      - lastName
 *    properties:
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 */
router.put("/change-name", Auth, validateChangeName, User.changeName);

/**
 * @swagger
 *   /api/users/ownership-transfer/{userId}:
 *   put:
 *     description: ownership transfer
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: userId
 *     schema:
 *        type: stirng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: ''
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.put("/ownership-transfer/:userId", Auth, User.transferTeamOwnerShip);

/**
 * @swagger
 *   /api/users/delete-team:
 *   delete:
 *     description: delete team
 *     tags: [Team]
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.delete("/delete-team", Auth, User.deleteTeam);

/**
 * @swagger
 *   /api/users/delete-team/{teamId}:
 *   delete:
 *     description: user details
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: teamId
 *     schema:
 *        type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.delete("/delete-team/:teamId", Auth, User.deleteTeamById);

//subscription

/**
 * @swagger
 *   /api/users/apply-coupon/{couponCode}:
 *   get:
 *     description: coupon for user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: couponCode
 *     schema:
 *        type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/coupon'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.get("/apply-coupon/:couponCode", User.applyCoupon);

/**
 * @swagger
 *   /api/users/subscribe/{userId}:
 *   put:
 *     description: subscribe user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *     schema:
 *        type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscribe'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   Subscribe:
 *    type: object
 *    required:
 *      - planId
 *      - priceId
 *      - nameOnCard
 *      - cardNumber
 *      - cardExpiry
 *      - cardCvv
 *      - teamName
 *      - autoRenew
 *      - couponCode
 *    properties:
 *      planId:
 *        type: string
 *      priceId:
 *         type: string
 *      nameOnCard:
 *         type: string
 *      cardNumber:
 *         type: string
 *      cardExpiry:
 *         type: string
 *      cardCvv:
 *         type: string
 *      teamName:
 *         type: string
 *      autoRenew:
 *         type: string
 *      couponCode:
 *         type: string
 */
router.put("/subscribe/:userId", Auth, validateSubscribe, User.subscribe);

/**
  * @swagger
  *   /api/users/change-payment-method/{userId}:
  *   put:
  *     description: change user payment method
  *     tags: [User]
  *     parameters:
  *       - in: path
  *         name: userId
  *     schema:
  *        type: integer
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/ChangePaymentMethod'
  *     responses:
  *        '200':
  *           description: Success
  *           content:
  *             application/json:
  *               schema:
  *                 type: object
  *                 properties:
  *                   success:
  *                     type: string
  *                   code:
  *                     type: integer
  *                   message:
  *                     type: string
  *                   data:
  *                     type: object
  *                 example:
  *                   success: true
  *                   code: 200
  *                   message: Operation successfull.
  *        '404':
  *           description: Operation Failed
  *           content:
  *             application/json:
  *               schema:
  *                 type: object
  *                 properties:
  *                   success:
  *                     type: string
  *                   code:
  *                     type: integer
  *                   message:
  *                     type: string
  *                   data:
  *                     type: object
  *                 example:
  *                    {"success": false,"code": 404,"message": "Operation Failed."}
  *
  *        '422':
  *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
  *           content:
  *             application/json:
  *               schema:
  *                 type: object
  *                 properties:
  *                   success:
  *                     type: string
  *                   code:
  *                     type: integer
  *                   message:
  *                     type: string
  *                   data:
  *                     type: object
  *                 example:
  *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
  *
  * components:
  *  schemas:
  *   ChangePaymentMethod:
  *    type: object
  *    required:
  *      - nameOnCard
  *      - cardNumber
  *      - cardExpiry
  *      - cardCvv
  *      - autoRenew
  *    properties:
  *      nameOnCard:
  *         type: string
  *      cardNumber:
  *         type: string
  *      cardExpiry:
  *         type: string
  *      cardCvv:
  *         type: string
  *      autoRenew:
  *         type: string
  */
router.put("/change-payment-method/:userId", Auth, validateChangePaymentMethod, User.changePaymentMethod);

/**
  * @swagger
  *   /api/users/add-payment-method/{userId}:
  *   put:
  *     description: add user payment method
  *     tags: [User]
  *     parameters:
  *       - in: path
  *         name: userId
  *     schema:
  *        type: integer
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/ChangePaymentMethod'
  *     responses:
  *        '200':
  *           description: Success
  *           content:
  *             application/json:
  *               schema:
  *                 type: object
  *                 properties:
  *                   success:
  *                     type: string
  *                   code:
  *                     type: integer
  *                   message:
  *                     type: string
  *                   data:
  *                     type: object
  *                 example:
  *                   success: true
  *                   code: 200
  *                   message: Operation successfull.
  *        '404':
  *           description: Operation Failed
  *           content:
  *             application/json:
  *               schema:
  *                 type: object
  *                 properties:
  *                   success:
  *                     type: string
  *                   code:
  *                     type: integer
  *                   message:
  *                     type: string
  *                   data:
  *                     type: object
  *                 example:
  *                    {"success": false,"code": 404,"message": "Operation Failed."}
  *
  *        '422':
  *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
  *           content:
  *             application/json:
  *               schema:
  *                 type: object
  *                 properties:
  *                   success:
  *                     type: string
  *                   code:
  *                     type: integer
  *                   message:
  *                     type: string
  *                   data:
  *                     type: object
  *                 example:
  *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
  *
  * components:
  *  schemas:
  *   ChangePaymentMethod:
  *    type: object
  *    required:
  *      - nameOnCard
  *      - cardNumber
  *      - cardExpiry
  *      - cardCvv
  *      - autoRenew
  *    properties:
  *      nameOnCard:
  *         type: string
  *      cardNumber:
  *         type: string
  *      cardExpiry:
  *         type: string
  *      cardCvv:
  *         type: string
  *      autoRenew:
  *         type: string
  */
router.put("/add-payment-method/:userId", Auth, validateChangePaymentMethod, User.addPaymentMethod);

/**
 * @swagger
 *   /api/users/renew-subscription/{userId}:
 *   put:
 *     description: renew subscription user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *     schema:
 *        type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 */
router.put("/renew-subscription/:userId", Auth, User.renewSubscription);

/**
 * @swagger
 *   /api/users/subscription-details:
 *   get:
 *     description: get Subscription Details
 *     tags: [User]
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.get("/subscription-details", Auth, User.getSubscriptionDetails);

/**
 * @swagger
 *   /api/users/cancel-subscription:
 *   delete:
 *     description: cancel Subscription
 *     tags: [User]
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.delete("/cancel-subscription", Auth, User.cancelSubscription);

/**
 * @swagger
 *   /api/users/resume-subscription:
 *   put:
 *     description: resume Subscription
 *     tags: [User]
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 */
router.put("/resume-subscription", Auth, User.resumeSubscription);

/**
 * @swagger
 *   /api/users/billing-history:
 *   get:
 *     description: get billing history
 *     tags: [User]
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: integer
 *        - in: query
 *          name: page_size
 *          schema:
 *              type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   BillingHistory:
 *    type: object
 *    properties:
 *      page:
 *        type: number
 *      page_size:
 *        type: number
 */
router.get("/billing-history", Auth, User.getBillingHistory);

/**
 * @swagger
 *   /api/users/orders:
 *   get:
 *     description: get billing history
 *     tags: [User]
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: integer
 *        - in: query
 *          name: page_size
 *          schema:
 *              type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Operation successfull.
 *        '404':
 *           description: Operation Failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 404,"message": "Operation Failed."}
 *
 *        '422':
 *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
 *
 * components:
 *  schemas:
 *   BillingHistory:
 *    type: object
 *    properties:
 *      page:
 *        type: number
 *      page_size:
 *        type: number
 */
router.get("/orders", Auth, User.getAllUsersBillingHistory);

router.post("/subscription-recurring-payment", User.subscriptionRecurringPayment);

module.exports = router;
