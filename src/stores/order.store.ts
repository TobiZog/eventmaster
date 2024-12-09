import { fetchAllOrders, fetchUserOrders, patchOrder } from "@/data/api/orderApi";
import { OrderApiModel } from "@/data/models/apiEndpoints/orderApiModel";
import { AccountModel } from "@/data/models/user/accountModel";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAccountStore } from "./account.store";

export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    /** All orders of one/all users */
    orders: ref<Array<OrderApiModel>>([]),

    /** Current selected order */
    order: ref<OrderApiModel>(new OrderApiModel),

    /** Show detail dialog on admin page */
    showDetailDialog: ref<boolean>(false),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false)
  }),

  actions: {
    /**
     * Get all orders from all accounts from server
     */
    async getAllOrders() {
      const accountStore = useAccountStore()
      this.fetchInProgress = true

      fetchAllOrders(accountStore.userAccountToken)
        .then(res => {
          this.orders = res.data
          this.fetchInProgress = false
        })
    },

    /**
     * Get all orders from one account from server
     * 
     * @param user User to request orders from
     */
    async getOrdersOfAccount(user: AccountModel, token: string) {
      this.fetchInProgress = true

      fetchUserOrders(user.id, token)
        .then(res => {
          this.orders = res.data
          this.fetchInProgress = false
        })
    },

    /**
     * Open detail dialog
     * 
     * @param order Order to view
     */
    openDetails(order: OrderApiModel) {
      this.order = order
      this.showDetailDialog = true
    },


    /**
     * 
     * @param order 
     * @param shipped 
     */
    async changeOrderShippedState(order: OrderApiModel, shipped: boolean) {
      this.fetchInProgress = true

      order.shipped = shipped

      patchOrder(order)
        .then(res => {
          this.getAllOrders()
        })
    }
  }
})