/**
 * @swagger
 * tags:
 *   name: Account
 *   description: API to manage accounts
 */
import { Router, Request, Response } from "express";
import { Account } from "../models/user/account.model";
import { validateString } from "../scripts/validateHelper";
import { Address } from "../models/user/address.model";
import { Payment } from "../models/user/payment.model";
import { AccountRole } from "../models/user/accountRole.model";
import { sequelize } from "../database";
import jwt from "jsonwebtoken"
import { verifyToken } from "../middlewares/auth.middleware";
import { encryptString } from "../scripts/encryptScripts";

export const account = Router()

/**
 * @swagger
 * /accounts/login:
 *   get:
 *     summary: Start login process
 *     tags: [Account]
 *     parameters:
 *        - in: query
 *          name: username
 *          schema:
 *            type: string
 *          required: true
 *          description: Username
 *        - in: query
 *          name: password
 *          schema:
 *            type: string
 *          required: true
 *          description: User password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/loginResponse'
 *       401:
 *         description: Wrong credentials
 *       500:
 *         description: Internal server error
 */
account.get("/login", async (req: Request, res: Response) => {
  const encryptedPassword = encryptString(String(req.query.password))

  try {
    // Using raw SQL code for SQL injections!
    const [results, metadata] = 
      await sequelize.query(
        "SELECT * FROM Accounts " +
        "WHERE (username='" + req.query.username + 
        "' AND password='" + encryptedPassword + "')"
      )

    if (results.length != 0) {
      // Creating session token
      const token = jwt.sign({ userId: results[0]["id"] }, 'sjcucjdkdf')

      // Status: 200 OK
      res.status(200).json({
        success: true,
        token: token
      })
    } else {
      // Status: 401 Unauthorized
      res.status(401).send()
    }
  } catch (e) {
    res.status(500).send()
  }
})


/**
 * @swagger
 * /accounts/account:
 *   get:
 *     summary: Get all data about an user account
 *     tags: [Account]
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/useraccount'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
account.get("/account", verifyToken, async(req: Request, res: Response) => {
  Account.findOne({
    where: {
      id: req["id"]
    },
    include: [ Address, AccountRole, Payment ],
    attributes: {
      exclude: [ "accountRoleId" ]
    }
  })
    .then(account => {
      res.status(200).json(account)
    })
    .catch(error => {
      res.status(500).send()
    })
})


/**
 * @swagger
 * /accounts/account:
 *   post:
 *     summary: Create a new user account
 *     tags: [Account]
 *     requestBody:
 *       description: Minimal user data body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/minimalAccount'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/useraccount'
 *       400:
 *         description: Username/password too short
 *       409:
 *         description: Username already in use
 */
account.post("/account", async (req: Request, res: Response) => {
  // Check if username is valid
  if (!validateString(req.body.username, 4))
  {
    // Status: 400 Bad request
    res.status(400).json({
      code: 400, 
      message: "Username too short!"
    })
  }

  // Check if password is valid
  if (!validateString(req.body.password, 8))
  {
    // Status: 400 Bad request
    res.status(400).json({ 
      code: 400, 
      message: "Password too short!"
    })
    return
  }

  // User on creation gets User role
  await AccountRole.findOne({
    where: {
      name: "User"
    }
  })
    .then(role => {
      req.body["accountRoleId"] = role.id
    })

  // Create account
  Account.create(req.body)
    .then(account => {
      // Status: 201 Created
      res.status(201).json(account)
    }).catch(error => {
      // Status: 409 Conflict
      res.status(409).json({
        code: 409,
        message: "Username already in use"
      })
    })
})



/**
 * @swagger
 * /accounts/account:
 *   patch:
 *     summary: Update an user accounts data
 *     tags: [Account]
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/useraccount'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
account.patch("/account", verifyToken, (req: Request, res: Response) => {
  Account.update(req.body,
  {
    where: { id: req.body.id }
  })
    .then(async result => {
      Payment.destroy({
        where: {
          accountId: req.body.id
        }
      })

      Address.destroy({
        where: {
          accountId: req.body.id
        }
      })

      for (let payment of req.body.payments) {
        payment["accountId"] = req.body.id

        await Payment.create(payment)
      }

      for (let address of req.body.addresses) {
        address["accountId"] = req.body.id

        await Address.create(address)
      }

      // Status: 200 OK
      let accountData = await Account.findByPk(req.body.id, { include: [ Payment, AccountRole, Address ]})
      res.status(200).json(accountData)
    })
    .catch(error => {
      // Status: 400 Bad request
      res.status(400).json({
        code: 400,
        message: error
    })
  })
})


/**
 * @swagger
 * /accounts/account/{id}:
 *   delete:
 *     summary: Delete an user account
 *     tags: [Account]
 *     security:
 *       - JWT: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: number
 *          required: true
 *          description: ID of user account
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
account.delete("/account/:id", verifyToken, (req: Request, res: Response) => {
  Account.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(account => {
      res.status(200).send()
    })
    .catch(error => {
      res.status(500).send()
    })
})


/**
 * @swagger
 * /accounts/:
 *   get:
 *     summary: Request all user accounts
 *     tags: [Account]
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/useraccount'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
account.get("/", verifyToken, (req: Request, res: Response) => {
  Account.findAll({
    include: [ AccountRole ]
  })
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(error => {
      res.status(500).send()
    })
})