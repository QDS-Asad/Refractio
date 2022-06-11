const express = require('express');
const router = express.Router();
const Role = require('../controllers/role.controller');

// /**
//  * @swagger
//  *   /api/roles/create-default:
//  *   post:
//  *     description: create new role
//  *     tags: [Role]
//  *     responses:
//  *        '200':
//  *           description: Success
//  *           content:
//  *             application/json:
//  *               schema:
//  *                 type: object
//  *                 properties:
//  *                   success:
//  *                     type: string
//  *                   code:
//  *                     type: integer
//  *                   message:
//  *                     type: string
//  *                   data:
//  *                     type: object
//  *                 example:
//  *                   success: true
//  *                   code: 200
//  *                   message: Operation successfull.
//  *        '404':
//  *           description: Operation Failed
//  *           content:
//  *             application/json:
//  *               schema:
//  *                 type: object
//  *                 properties:
//  *                   success:
//  *                     type: string
//  *                   code:
//  *                     type: integer
//  *                   message:
//  *                     type: string
//  *                   data:
//  *                     type: object
//  *                 example:
//  *                    {"success": false,"code": 404,"message": "Operation Failed."}
//  *
//  *        '422':
//  *           description: Unprocessable entity - This occurs in cases where data might not be valid (E.g Data provided is not valid.)
//  *           content:
//  *             application/json:
//  *               schema:
//  *                 type: object
//  *                 properties:
//  *                   success:
//  *                     type: string
//  *                   code:
//  *                     type: integer
//  *                   message:
//  *                     type: string
//  *                   data:
//  *                     type: object
//  *                 example:
//  *                    {"success": false,"code": 422,"message": "Data provided is not valid."}
//  * 
//  * components:
//  *  schemas:
//  *   Role:
//  *    type: object
//  *    required:
//  *      - roleId
//  *      - key
//  *      - name
//  *    properties:
//  *      roleId:
//  *        type: Number
//  *      key:
//  *        type: string
//  *      name:
//  *        type: string
//  */
// router.post('/create-default', Role.createDefaultRoles)

/**
 * @swagger
 *   /api/roles:
 *   get:
 *     description: get all roles
 *     tags: [Role]
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
router.get('/', Role.getRoles)

module.exports = router;
