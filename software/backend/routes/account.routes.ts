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
account.post("/", (req: Request, res: Response, next: NextFunction) => {
  if (!validateString(req.body.username, 4))
  {
    res.status(400).send({ error: "Username too short!" })
  }
  else if (!validateString(req.body.password, 8))
  {
    res.status(400).send({ error: "Password too short!" })
  }
  else
  {
    Account.create(req.body)
    .then(account => {
      res.json(account)
      res.status(200).send()
    }).catch(reason => {
      res.status(400).send({ error: reason })
    })
  }
})