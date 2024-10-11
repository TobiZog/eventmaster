import { AccountModel } from "../user/accountModel"
import { AddressModel } from "../user/addressModel"
import { PaymentModel } from "../user/paymentModel"
import { OrderModel } from "./orderModel"
import { TicketApiModel } from "./ticketApiModel"

export class OrderApiModel extends OrderModel {
  tickets: Array<TicketApiModel>
  account: AccountModel
  payment: PaymentModel
  address: AddressModel
}