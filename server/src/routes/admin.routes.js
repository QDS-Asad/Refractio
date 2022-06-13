const express = require('express');
const router = express.Router();
const Admin = require('../controllers/admin.controller');
const Auth = require('../middlewares/auth');
const { validatePlan } = require('../middlewares/plan');


/**
 * @swagger
 *   /api/admin/plans:
 *   post:
 *     description: create new plan
 *     tags: [Super Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plans'
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
 *   Plans:
 *    type: object
 *    required:
 *      - name
 *      - description
 *      - monthlyPrice
 *      - yearlyPrice
 *    properties:
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      monthlyPrice:
 *        type: string
 *      yearlyPrice:
 *        type: string
 */
router.post('/plans', validatePlan, Admin.createPlan);


module.exports = router;
