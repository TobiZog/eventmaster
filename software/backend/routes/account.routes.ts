import { Router, Request, Response, NextFunction } from "express";
import { Account } from "../models/account.model";

export const account = Router()

account.get("/", (req: Request, res: Response, next: NextFunction)=> {
  Account.findAll()
    .then(accounts => {
      res.json(accounts)
    })
    .catch(next)
})