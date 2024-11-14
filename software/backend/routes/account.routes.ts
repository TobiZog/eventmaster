import { Router, Request, Response } from "express";
import { Account } from "../models/user/account.model";
import { validateString } from "../scripts/validateHelper";
import { Address } from "../models/user/address.model";
import { Payment } from "../models/user/payment.model";
import { AccountRole } from "../models/user/accountRole.model";
import { Exercise } from "../models/exercises/exercise.model";
import { sequelize } from "../database";

export const account = Router()

account.get("/", (req: Request, res: Response) => {
  Account.findAll({
    include: [ AccountRole ]
  })
    .then(accounts => {
      res.status(200).json(accounts)
    })
})

// Login user
account.post("/login", async (req: Request, res: Response) => {
  // Using raw SQL code for SQL injections!
  const [results, metadata] = 
    await sequelize.query(
      "SELECT * FROM Accounts " +
      "WHERE (username='" + req.body.username + 
      "' AND password='" + req.body.password + "')")

  // Mechanism to check exercise solved
  if (results.length > 1) {
    Exercise.update(
        { solved: true },
        {
          where: {
            nameEn: "Register"
          }
        }
      )
  }

  if (results.length != 0) {
    
    // Status: 200 OK
    res.status(200).json(results[0])
  } else {
    // Status: 401 Unauthorized
    res.status(401).json({
      code: 401, 
      message: "Unauthorized"
    })
  }
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

account.delete("/:id", (req: Request, res: Response) => {
  Account.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(account => {
      res.status(200).send()
    })
})