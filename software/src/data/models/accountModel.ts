import { AccountRole } from "./accountRole"
import { AddressModel } from "./addressModel"
import { PaymentModel } from "./paymentModel"

export class AccountModel {
  id: number
  username: string = ""
  password: string = ""
  email: string = ""
  firstName: string = ""
  lastName: string = ""
  addresses: Array<AddressModel> = [ new AddressModel() ]
  payments: Array<PaymentModel> = [ new PaymentModel() ]
  accountRole: AccountRole = new AccountRole()
}