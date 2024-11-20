import { useLocalStorage } from "@vueuse/core";
import { AccountModel } from "../data/models/user/accountModel";
import { useFeedbackStore } from "./feedback.store";
import { deleteAccount, fetchAllAccounts, getAccount, login, registerAccount, updateAccount } from "../data/api/accountApi";
import { fetchUserOrders } from "../data/api/orderApi";
import { BannerStateEnum } from "../data/enums/bannerStateEnum";
import { AddressModel } from "../data/models/user/addressModel";
import { PaymentModel } from "../data/models/user/paymentModel";
import { AccountApiModel } from "../data/models/user/accountApiModel";
import { ref } from "vue";
import { defineStore } from "pinia";
import { useExerciseStore } from "./exercise.store";

export const useAccountStore = defineStore("accountStore", {
  state: () => ({
    /** All accounts */
    accounts: ref<Array<AccountApiModel>>([]),

    /** Useraccount which is currently logged in */
    userAccountToken: useLocalStorage("hackmycart/accountStore/userAccountToken", ""),

    userAccount: useLocalStorage("hackmycart/accountStore/userAccount", new AccountApiModel()),

    /** User input on login screen */
    loginData: ref<{ username: String, password: String}>(
      { username: "", password: "" }
    ),

    /** Buffer for register data */
    registerData: ref<AccountModel>(new AccountModel()),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false),

    adminPanelVisible: ref(false),

    privilegeBuy: ref(false)
  }),

  actions: {
    async getAllAccounts() {
      this.fetchInProgress = true

      fetchAllAccounts()
        .then(response => {
          this.accounts = response.data
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
        await login(this.loginData.username, this.loginData.password)
          .then(async result => {
            this.userAccountToken = result.data.token

            getAccount(this.userAccountToken)
              .then(response => {
                this.userAccount = response.data

                feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTLOGINSUCCESSFUL)
                this.fetchInProgress = false

                this.privilegeBuy = true
                this.adminPanelVisible = response.data.accountRole.privilegeAdminPanel

                if (response.data.accountRoleId == 3) {
                  exerciseStore.solveExercise(2, 4)
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
     * Register a new account to the database
     * Log in on success
     * 
     * @returns True on success
     */
    async registerAccount(): Promise<boolean> {
      const feedbackStore = useFeedbackStore()
      const exerciseStore = useExerciseStore()
      this.fetchInProgress = true

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
        })
        .catch((error) => {
          if (error.status == 400) {
            feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTREGISTERERROR)
          } else if (error.status == 409) {
            feedbackStore.addSnackbar(BannerStateEnum.ACCOUNTREGISTERUSERNAMEINUSE)
          }

          this.fetchInProgress = false
          return false
        })

        return false
    },

    /**
     * Update values of an existing account on server
     */
    async updateAccount() {
      const feedbackStore = useFeedbackStore()
      const exerciseStore = useExerciseStore()

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

    async getAdresses() {

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
    },

    /**
     * Remove an payment from the user model
     * 
     * @param address Payment dataset to remove
     */
    removePayment(payment: PaymentModel) {
      this.userAccount.payments = this.userAccount.payments.filter((paym: PaymentModel) =>
        paym != payment
      )
    },

    editAccount(item: AccountModel) {
      // todo
    },

    async deleteAccount(account: AccountModel) {
      this.fetchInProgress = true

      deleteAccount(account)
        .then(response => {
          this.fetchInProgress = false
        })
    }
  }
})