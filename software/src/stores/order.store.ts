import { fetchAllOrders, fetchUserOrders } from "@/data/api/orderApi";
import { OrderApiModel } from "@/data/models/apiEndpoints/orderApiModel";
import { AccountModel } from "@/data/models/user/accountModel";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    /** All orders of one/all users */
    orders: ref<Array<OrderApiModel>>([]),

    /** Request to server sent, waiting for data response */
    fetchInProgress: ref(false)
  }),

  actions: {
    /**
     * Get all orders from all accounts from server
     */
    async getAllOrders() {
      fetchAllOrders()
        .then(res => {
          this.orders = res.data
        })
    },

    /**
     * Get all orders from one account from server
     * 
     * @param user User to request orders from
     */
    async getOrdersOfAccount(user: AccountModel) {
      fetchUserOrders(user.id)
        .then(res => {
          this.orders = res.data
        })
    }
  }
})