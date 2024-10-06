import { AddressModel } from "../user/addressModel"
import { PaymentModel } from "../user/paymentModel"
import { TicketModel } from "./ticketModel"

export class OrderModel {
  id: number
  accountId: number
  shippingProgress: number
  tickets: Array<TicketModel>
  orderedAt: string
  payment: PaymentModel
  address: AddressModel
}