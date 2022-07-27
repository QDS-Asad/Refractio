const express = require('express');
const router = express.Router();
const Plan = require('../controllers/plan.controller');
const Auth = require('../middlewares/auth');
// const { validatePlan } = require('../middlewares/plan');


// /**
//  * @swagger
//  *   /api/plans:
//  *   post:
//  *     description: create new plan
//  *     tags: [Plans]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Plans'
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
//  *   Plans:
//  *    type: object
//  *    required:
//  *      - name
//  *      - description
//  *      - monthlyPrice
//  *      - yearlyPrice
//  *    properties:
//  *      name:
//  *        type: string
//  *      description:
//  *        type: string
//  *      prices:
//  *        type: array
//  *        items:
//  *          $ref: '#/definitions/PlanItems'
//  * 
//  * definitions:
//  *   PlanItems:
//  *    type: object
//  *    properties:
//  *      amount:
//  *        type: number
//  *      interval:
//  *        type: string
//  */
// router.post('/plans', validatePlan, Plan.createPlan);

// /**
//  * @swagger
//  *   /api/plans:
//  *   put:
//  *     description: update plan
//  *     tags: [Plans]
//  *     parameters:
//  *       - in: path
//  *         name: planId
//  *     schema:
//  *        type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Plans'
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
//  *   Plans:
//  *    type: object
//  *    required:
//  *      - name
//  *      - description
//  *      - monthlyPrice
//  *      - yearlyPrice
//  *    properties:
//  *      name:
//  *        type: string
//  *      description:
//  *        type: string
//  *      prices:
//  *        type: array
//  *        items:
//  *          $ref: '#/definitions/PlanItems'
//  * 
//  *  definitions:
//  *   PlanItems:
//  *    type: object
//  *    properties:
//  *      amount:
//  *        type: number
//  *      interval:
//  *        type: string
//  */
// router.put('/plans/:planId', validatePlan, Plan.updatePlan);

// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);
// /**
//  * @swagger
//  *   /api/plans:
//  *   get:
//  *     description: get plans
//  *     tags: [Plans]
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
//  */
// router.get('/plans', Plan.getAllPlans);

// /**
//  * @swagger
//  *   /api/plans/{planId}:
//  *   get:
//  *     description: get plans by planId
//  *     tags: [Plans]
//  *     parameters:
//  *       - in: path
//  *         name: planId
//  *     schema:
//  *        type: string
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
//  */
// router.get('/plans/:planId', Plan.getPlanByPlanId);

// /**
//  * @swagger
//  *   /api/plans/prices/{planId}:
//  *   get:
//  *     description: get plans price by planId
//  *     tags: [Plans]
//  *     parameters:
//  *       - in: path
//  *         name: planId
//  *     schema:
//  *        type: string
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
//  */
// router.get('/plans/prices/:planId', Plan.getPricesByPlanId);

// /**
//  * @swagger
//  *   /api/plans/{planId}:
//  *   delete:
//  *     description: delete plan by planId
//  *     tags: [Plans]
//  *     parameters:
//  *       - in: path
//  *         name: planId
//  *     schema:
//  *        type: string
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
//  */
// router.delete('/plans/:planId', Plan.deletePlan);

/**
 * @swagger
 *   /api/plans:
 *   get:
 *     description: get plans
 *     tags: [Plans]
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
router.get('/plans', Plan.getAllPlans);

module.exports = router;
