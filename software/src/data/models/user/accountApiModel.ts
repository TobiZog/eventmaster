import { AccountModel } from "./accountModel"
import { AccountRole } from "./accountRole"
import { AddressModel } from "./addressModel"
import { PaymentModel } from "./paymentModel"

export class AccountApiModel extends AccountModel {
  addresses: Array<AddressModel>
  payments: Array<PaymentModel>
  accountRole: AccountRole
}