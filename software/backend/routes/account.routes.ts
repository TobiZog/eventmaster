import { Router, Request, Response, NextFunction } from "express";
import { Account } from "../models/account.model";
import { validateString } from "../scripts/validateHelper";

export const account = Router()

// Login user
account.post("/login", (req: Request, res: Response) => {
  Account.findOne({ 
    raw: true, 
    where: { username: req.body.username }
  })
    .then(account => {
      if (account != null) {
        if (account.password == req.body.password) {
          // Status: 200 OK
          res.status(200).json(account).send()
        } else {
          // Status: 401 Unauthorized
          res.status(401).send()
        }
      } else {
        // Status: 400 Bad request
        res.status(400).send()
      }
    }
  )
})

// Creating a new user
account.post("/", (req: Request, res: Response) => {
  // Check if username is valid
  if (!validateString(req.body.username, 4))
  {
    // Status: 400 Bad request
    res.status(400).json({
      message: "Username too short!"
    }).send()
  }

  // Check if password is valid
  if (!validateString(req.body.password, 8))
  {
    // Status: 400 Bad request
    res.status(400).json({ 
      message: "Password too short!"
    }).send()
  }

  // Create account
  Account.create(req.body)
  .then(account => {
    // Status: 201 Created
    res.status(201).json(account).send()
  }).catch(reason => {
    // Status: 409 Conflict
    res.status(409).send()
  })
})

account.patch("/", (req: Request, res: Response) => {
  Account.update(req.body,
  {
    where: { id: req.body.id }
  })
    .then(account => {
      // Status: 200 OK
      res.status(200).json(account).send()
    })
    .catch(error => {
      // Status: 400 Bad request
      res.status(400).json({
      message: error
    }).send()
  })
})
