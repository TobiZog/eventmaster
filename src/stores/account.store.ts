import { useLocalStorage } from "@vueuse/core";
import { AccountModel } from "../data/models/user/accountModel";
import { useFeedbackStore } from "./feedback.store";
import { deleteAccount, fetchAllAccounts, getAccount, getLogin, registerAccount, updateAccount } from "../data/api/accountApi";
import { fetchUserOrders } from "../data/api/orderApi";
import { BannerStateEnum } from "../data/enums/bannerStateEnum";
import { AddressModel } from "../data/models/user/addressModel";
import { PaymentModel } from "../data/models/user/paymentModel";
import { AccountApiModel } from "../data/models/user/accountApiModel";
import { ref } from "vue";
import { defineStore } from "pinia";
import { useExerciseStore } from "./exercise.store";
import moment, { Moment } from "moment";

export const useAccountStore = defineStore("accountStore", {
  state: () => ({
    /** All accounts */
    accounts: ref<Array<AccountApiModel>>([]),

    /** Server token of currently logged in account */
    userAccountToken: useLocalStorage("eventMaster/accountStore/userAccountToken", ""),

    /** Useraccount which is currently logged in */
    userAccount: useLocalStorage("eventMaster/accountStore/userAccount", new AccountApiModel()),

    /** User input on login screen */
    loginData: ref<{ username: String, password: String}>(
      { username: "", password: "" }
    ),

    /** Buffer for register data */
    registerData: ref<AccountModel>(new AccountModel()),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false),

    /** Flag to show or hide admin icon in navigation bar */
    adminPanelVisible: ref(false),

    /** Flag to activate buy option on basket page */
    privilegeBuy: ref(false),

    payment: ref(),

    address: ref(),

    showEditDialog: ref(false),

    loggedInTimeStamp: useLocalStorage<string>("eventMaster/accountStore/loggedInTimeStamp", "")
  }),

  actions: {
    /**
     * Fetch all accounts on the database
     */
    async getAllAccounts() {
      this.fetchInProgress = true

      fetchAllAccounts(this.userAccountToken)
        .then(response => {
          this.accounts = response.data
          this.fetchInProgress = false
        })
        .catch(onrejected => {
          this.fetchInProgress = false
        })
    },

    /**
     * Start the login process
     * 
     * @returns True on success
     */
    async login(): Promise<boolean> {
      const feedbackStore = useFeedbackStore()
      const exerciseStore = useExerciseStore()
      this.fetchInProgress = true

      // Validate
      if (this.loginData.username == null || this.loginData.username.length == 0 ||
        this.loginData.password == null || this.loginData.password.length == 0
      ) {
        feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTLOGINWRONGLOGIN)
        this.fetchInProgress = false
        return false
      }
      else
      {
        await getLogin(this.loginData.username, this.loginData.password)
          .then(async result => {
            this.userAccountToken = result.data.token
            this.loggedInTimeStamp = moment().format("YYYY-MM-DDTHH:mm:ss.SSS")

            getAccount(this.userAccountToken)
              .then(response => {
                this.userAccount = response.data

                feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTLOGINSUCCESSFUL)
                this.fetchInProgress = false

                this.privilegeBuy = true
                this.adminPanelVisible = response.data.accountRole.privilegeAdminPanel

                if (response.data.accountRoleId == 2) {
                  exerciseStore.solveExercise(2, 5)
                }
              })
          })
          .catch(error => {
            if (error.status == 400) {
              feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTLOGINERROR)
            } else if (error.status == 401) {
              feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTLOGINWRONGLOGIN)
            }

            this.fetchInProgress = false
            return false
          })
      }
    },

    /**
     * Reload account information about current logged in user
     */
    async refreshAccount() {
      this.fetchInProgress = true

      getAccount(this.userAccountToken)
        .then(response => {
          this.userAccount = response.data

          this.privilegeBuy = true
          this.adminPanelVisible = response.data.accountRole.privilegeAdminPanel

          this.fetchInProgress = false
        })
    },

    /**
     * Register a new account to the database
     * Log in on success
     * 
     * @returns True on success
     */
    async registerAccount(): Promise<boolean> {
      const feedbackStore = useFeedbackStore()
      const exerciseStore = useExerciseStore()
      let success = false
      this.fetchInProgress = true

      if (this.registerData.username == null || this.registerData.username.length < 4) {
        feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTUSERNAMETOOSHORT)
      } else if (this.registerData.password == null || this.registerData.password.length < 8) {
        feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTPASSWORDTOOSHORT)
      } else if (!this.registerData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTMAILADDRESSUNVALID)
      }
      else
      {
        await registerAccount(this.registerData)
          .then(async res => {
            if (res.status == 201) {
              feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTREGISTERSUCCESSFUL)
              exerciseStore.solveExercise(0, 1)
            }

            this.loginData = {
              username: this.registerData.username,
              password: this.registerData.password
            }

            this.fetchInProgress = false
            success = true
          })
          .catch((error) => {
            if (error.status == 400) {
              feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTREGISTERERROR)
            } else if (error.status == 409) {
              feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTREGISTERUSERNAMEORMAILINUSE)
            }

            this.fetchInProgress = false
          })
      }

      this.fetchInProgress = false
      return success
    },

    /**
     * Update values of an existing account on server
     */
    async updateAccount() {
      const feedbackStore = useFeedbackStore()
      const exerciseStore = useExerciseStore()
      this.fetchInProgress = true

      // Check for exercise 0.2 completion
      let accountComplete = this.userAccount.firstName != "" && this.userAccount.lastName != "" && 
        this.userAccount.addresses.length != 0 && this.userAccount.payments.length != 0

      if (accountComplete) {
        exerciseStore.solveExercise(0, 2)
      }

      // Update in backend
      await updateAccount(this.userAccount, this.userAccountToken)
        .then(res => {
          
          if (res.status == 200) {
            feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTUPDATESUCCESSFUL)

            this.userAccount = res.data
            this.fetchInProgress = false
          }
        })
    },

    /**
     * Logout user
     */
    logout() {
      const feedbackStore = useFeedbackStore()

      this.userAccount = new AccountModel()
      this.userAccountId = -1
      this.loggedIn = false
      this.privilegeBuy = false
      this.adminPanelVisible = false
      this.userAccountToken = ""
      
      feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTLOGOUTSUCCESSFUL)
    },

    /**
     * Get all orders from current user
     */
    async refreshOrders() {
      this.fetchInProgress = true

      await fetchUserOrders(this.userAccount.id)
        .then(result => {
          this.orders = result.data
          this.fetchInProgress = false
        })
    },

    newAddress() {
      this.address = new AddressModel()
      this.showEditDialog = true
    },

    editAddress(address: AddressModel) {
      this.address = address
      this.showEditDialog = true
    },

    async saveAddress() {
      this.fetchInProgress = true

      if (this.address.id == undefined) {
        this.userAccount.addresses.push(this.address)
      } else {
        this.userAccount.addresses = this.userAccount.addresses.filter(address => {
          return address.id != this.address.id
        })

        this.userAccount.addresses.push(this.address)
      }

      await this.updateAccount()
      this.showEditDialog = false
    },

    /**
     * Remove an address from the user model
     * 
     * @param address Address dataset to remove
     */
    removeAddress(address: AddressModel) {
      this.userAccount.addresses = this.userAccount.addresses.filter((addr: AddressModel) => 
        addr != address
      )

      this.updateAccount()
    },

    /**
     * Add a new payment, opens dialog
     */
    newPayment() {
      this.payment = new PaymentModel()
      this.showEditDialog = true
    },

    /**
     * Edit existing payment, opens dialog
     * 
     * @param payment Payment dataset to edit
     */
    editPayment(payment: PaymentModel) {
      this.payment = payment
      this.showEditDialog = true
    },

    /**
     * Save current edited payment
     */
    async savePayment() {
      this.fetchInProgress = true

      if (this.payment.id == undefined) {
        this.userAccount.payments.push(this.payment)
      } else {
        this.userAccount.payments = this.userAccount.payments.filter(payment => {
          return payment.id != this.payment.id
        })

        this.userAccount.payments.push(this.payment)
      }

      await this.updateAccount()
      this.showEditDialog = false
    },

    /**
     * Remove a payment from the user model
     * 
     * @param address Payment dataset to remove
     */
    async removePayment(payment: PaymentModel) {
      this.userAccount.payments = await this.userAccount.payments.filter((paym: PaymentModel) =>
        paym != payment
      )

      this.updateAccount()
    },

    /**
     * Delete user account
     * 
     * @param account Account which should be deleted
     */
    async deleteAccount(account: AccountModel) {
      this.fetchInProgress = true

      deleteAccount(account)
        .then(response => {
          this.fetchInProgress = false
        })
    }
  }
})