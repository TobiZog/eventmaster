import { fetchAllOrders, fetchUserOrders } from "@/data/api/orderApi";
import { OrderApiModel } from "@/data/models/apiEndpoints/orderApiModel";
import { AccountModel } from "@/data/models/user/accountModel";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    /** All orders of one/all users */
    orders: ref<Array<OrderApiModel>>([]),

    order: ref<OrderApiModel>(new OrderApiModel),

    showDetailDialog: ref<boolean>(false),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false)
  }),

  actions: {
    /**
     * Get all orders from all accounts from server
     */
    async getAllOrders() {
      this.fetchInProgress = true

      fetchAllOrders()
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
    async getOrdersOfAccount(user: AccountModel) {
      this.fetchInProgress = true

      fetchUserOrders(user.id)
        .then(res => {
          this.orders = res.data
          this.fetchInProgress = false
        })
    },

    openDetails(order: OrderApiModel) {
      this.order = order
      this.showDetailDialog = true
    },

    async deleteOrder(order: OrderApiModel) {
      // todo
    }
  }
})