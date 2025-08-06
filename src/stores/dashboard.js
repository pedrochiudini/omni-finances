import { defineStore } from "pinia";
import { verifyToken } from "../main";
import { toast } from "vue3-toastify";
import api from "../api";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    goalValueFixo: 0,
    goalValueDesejo: 0,
    goalValuePoupanca: 0,

    usedValueFixo: 0,
    usedValueDesejo: 0,
    usedValuePoupanca: 0,

    percentUsedFixo: 0,
    percentUsedDesejo: 0,
    percentUsedPoupanca: 0,

    totalIncomes: 0,
    totalExpenses: 0,
    totalSavings: 0,
    balance: 0,
  }),
  actions: {
    async carregarDashboard() {
      try {
        const response = await api.get("/dashboard");
        const data = response.data;

        this.goalValueFixo = data["ideal_expenses"]["FI"];
        this.goalValueDesejo = data["ideal_expenses"]["DE"];
        this.goalValuePoupanca = data["ideal_expenses"]["PO"];

        this.usedValueFixo = data["expenses_by_category"]["FI"];
        this.usedValueDesejo = data["expenses_by_category"]["DE"];
        this.usedValuePoupanca = data["expenses_by_category"]["PO"];

        this.percentUsedFixo = data["percent_expenses"]["FI"];
        this.percentUsedDesejo = data["percent_expenses"]["DE"];
        this.percentUsedPoupanca = data["percent_expenses"]["PO"];

        this.totalIncomes = data["total_amount_incomes"];
        this.totalExpenses = data["total_amount_expenses"];
        this.totalSavings = data["expenses_by_category"]["PO"];
        this.balance = data["balance"];
      } catch (err) {
        if (err.response?.data?.message) {
          verifyToken(err);
          toast.error(err.response.data.message);
        } else {
          toast.error("Erro ao buscar dados.");
        }
      }
    },
  },
});
