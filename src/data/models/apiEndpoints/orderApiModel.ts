import { AccountModel } from "../user/accountModel"
import { AddressModel } from "../user/addressModel"
import { PaymentModel } from "../user/paymentModel"
import { OrderModel } from "../ordering/orderModel"
import { TicketModel } from "../ordering/ticketModel"
import { ConcertApiModel } from "../acts/concertApiModel"
import { SeatModel } from "../locations/seatModel"
import { SeatRowModel } from "../locations/seatRowModel"
import { SeatGroupModel } from "../locations/seatGroupModel"

/**
 * Replica of API endpoint /orders/:id
 */
export class OrderApiModel extends OrderModel {
  tickets: Array<TicketOrderModel>
  account: AccountModel
  payment: PaymentModel
  address: AddressModel
}

class TicketOrderModel extends TicketModel {
  concert: ConcertApiModel
  seat: SeatTicketModel
}

class SeatTicketModel extends SeatModel {
  seatRow: SeatRowTicketModel
}

class SeatRowTicketModel extends SeatRowModel {
  seatGroup: SeatGroupModel
}