import { Router, Request, Response, NextFunction } from "express";
import { Account } from "../models/account.model";
import { validateString } from "../scripts/validateHelper";

export const account = Router()

// Login user
account.get("/", (req: Request, res: Response) => {
  Account.findOne({ 
    raw: true, 
    where: { username: req.body.username }
  })
    .then(account => {
      if (account != null) {
        if (account.password == req.body.password) {
          // Status: 200 Created
          res.status(201).json({ 
            loginSuccessful: true,
            userId: account.id,
            message: ""
          }).send()
        } else {
          // Status: 401 Unauthorized
          res.status(401).json({
            loginSuccessful: false,
            userId: -1,
            message: "Wrong password"
          }).send()
        }
      } else {
        // Status: 401 Unauthorized
        res.status(401).json({
          loginSuccessful: false,
          userId: -1,
          message: "Username doesn't exists"
        }).send()
      }
    }
  )
})

// Creating a new user
account.post("/", (req: Request, res: Response) => {
  if (!validateString(req.body.username, 4))
  {
    // Status: 400 Bad request
    res.status(400).json({
      message: "Username too short!"
    }).send()
  }
  else if (!validateString(req.body.password, 8))
  {
    // Status: 400 Bad request
    res.status(400).json({ 
      message: "Password too short!"
    }).send()
  }
  else
  {
    Account.create(req.body)
    .then(account => {
      res.status(200).json(account).send()
    }).catch(reason => {
      // Status: 400 Bad request
      res.status(400).json({ 
        message: reason
      }).send()
    })
  }
})

account.patch("/", (req: Request, res: Response) => {
  Account.update(req.body,
  {
    where: { id: req.body.id }
  })
    .then(account => {
      res.status(200).send()
    })
    .catch(error => {
      res.status(400).json({
      message: error
    }).send()
  })
})
