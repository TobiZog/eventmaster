import { Router, Request, Response } from "express";
import { Account } from "../models/user/account.model";
import { validateString } from "../scripts/validateHelper";
import { Address } from "../models/user/address.model";
import { Payment } from "../models/user/payment.model";
import { AccountRole } from "../models/user/accountRole.model";
import { Exercise } from "../models/exercises/exercise.model";

export const account = Router()

// Login user
account.post("/login", (req: Request, res: Response) => {
  Account.findOne({ 
    where: { username: req.body.username },
    include: [ Address, Payment, AccountRole ],
    attributes: {
      exclude: [
        "accountRoleId"
      ]
    }
  })
    .then(account => {
      if (account != null) {
        if (account.dataValues.password == req.body.password) {
          // Status: 200 OK
          res.status(200).json(account)
        } else {
          // Status: 401 Unauthorized
          res.status(401).json({
            code: 401, 
            message: "Unauthorized"
          })
        }
      } else {
        // Status: 400 Bad request
        res.status(400).json({
          code: 400, 
          message: "Bad Request"
        })
      }
    }
  )
})

// Creating a new user
account.post("/", async (req: Request, res: Response) => {
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
  }

  // Create account
  await AccountRole.findOne({
    where: {
      name: "User"
    }
  })
    .then(role => {
      req.body["accountRoleId"] = role.id
    })

  Account.create(req.body)
    .then(account => {
      // Status: 201 Created
      res.status(201).json(account)

      // Check exercise in table
      Exercise.update(
        { solved: true },
        {
          where: {
            nameEn: "Register"
          }
        }
      )
    }).catch(reason => {
      // Status: 409 Conflict
      res.status(409).json({
        code: 409,
        message: "Username already in use"
      })
    })
})

account.patch("/", (req: Request, res: Response) => {
  Account.update(req.body,
  {
    where: { id: req.body.id }
  })
    .then(async account => {
      for (let payment of req.body.payments) {
        await Payment.update(payment,
          {
            where: { id: payment.id }
          }
        )
      }

      for (let address of req.body.addresses) {
        await Address.update(address,
          {
            where: { id: address.id }
          }
        )
      }

      // Status: 200 OK
      res.status(200).json(account)
    })
    .catch(error => {
      // Status: 400 Bad request
      res.status(400).json({
        code: 400,
        message: error
    })
  })
})
