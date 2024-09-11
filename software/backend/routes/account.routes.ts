import { Router, Request, Response, NextFunction } from "express";
import { Account } from "../models/account.model";
import { validateString } from "../scripts/validateHelper";

export const account = Router()

// Request all user from the database
account.get("/", (req: Request, res: Response, next: NextFunction) => {
  Account.findAll()
    .then(accounts => {
      res.json(accounts)
    })
    .catch(next)
})

// Creating a new user
account.post("/register", (req: Request, res: Response, next: NextFunction) => {
  if (!validateString(req.body.username, 4))
  {
    // Status: 400 Bad request
    res.status(400).send({ error: "Username too short!" })
  }
  else if (!validateString(req.body.password, 8))
  {
    // Status: 400 Bad request
    res.status(400).send({ error: "Password too short!" })
  }
  else
  {
    Account.create(req.body)
    .then(account => {
      res.json(account)

      // Status: 200 OK
      res.status(200).send()
    }).catch(reason => {
      // Status: 400 Bad request
      res.status(400).send({ error: reason })
    })
  }
})

account.post("/login", (req: Request, res: Response, next: NextFunction) => {
  Account.findOne({ raw: true, where: { username: req.body.username }})
    .then(account => {
      if (account != null) {
        if (account.password == req.body.password) {
          // Status: 200 OK
          res.status(200).send({ userAccountId: account.id })
        } else {
          // Status: 401 Unauthorized
          res.status(401).send()
        }
      } else {
        // Status: 401 Unauthorized
        res.status(401).send()
      }
    }
  )
})