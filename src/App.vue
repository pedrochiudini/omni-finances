<script setup>
import AppHeader from './components/AppHeader.vue';
import IncomeInput from './components/IncomeInput.vue';
import ExpenseCard from './components/ExpenseCard.vue';
import ExpenseOutput from './components/ExpenseOutput.vue';
import MonthSummaryCard from './components/MonthSummaryCard.vue';
import AppLogin from './components/AppLogin.vue';

import house from './assets/casa.svg';
import bag from './assets/compra.png';
import dolar from './assets/dolar.png';

import { useAuthStore } from "./stores/auth";
import { useDashboardStore } from './stores/dashboard';
import { watch, onMounted, ref } from 'vue';

const auth = useAuthStore();
const dashboard = useDashboardStore();

function formatarValor(valor) {
  const numero = Number(valor);

  if (isNaN(numero)) {
    return '0,00';
  }

  return Number(valor).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

onMounted(() => {
  if (auth.isAuthenticated) {
    dashboard.carregarDashboard()
  }
})

watch(
  () => auth.isAuthenticated,
  (val) => {
    if (val) {
      dashboard.carregarDashboard()
    }
  }
)
</script>

<template>

  <div id="overlay-auth" v-if="!auth.isAuthenticated">
    <AppLogin />
  </div>

  <div v-else class="dashboard">

    <AppHeader />

    <section id="monthly-input">
      <IncomeInput />
    </section>

    <section id="cards-expenses">
      <div class="card-container">
        <ExpenseCard title="Fixos" :goalPercentage=50 :goalValue="formatarValor(dashboard.goalValueFixo)"
          :usedValue="formatarValor(dashboard.usedValueFixo)" :percentUsed="dashboard.percentUsedFixo" :icon="house" bgColorClass="bg-red"
          textColorClass="text-red" barColorClass="bar-red" />

        <ExpenseCard title="Desejos" :goalPercentage=30 :goalValue="formatarValor(dashboard.goalValueDesejo)"
          :usedValue="formatarValor(dashboard.usedValueDesejo)" :percentUsed="dashboard.percentUsedDesejo" :icon="bag"
          bgColorClass="bg-orange" textColorClass="text-orange" barColorClass="bar-orange" />

        <ExpenseCard title="Poupança" :goalPercentage=20 :goalValue="formatarValor(dashboard.goalValuePoupanca)"
          :usedValue="formatarValor(dashboard.usedValuePoupanca)" :percentUsed="dashboard.percentUsedPoupanca" :icon="dolar"
          bgColorClass="bg-green" textColorClass="text-green" barColorClass="bar-green" labelUsed="Poupado"
          labelSuffix="da meta" />
      </div>
    </section>

    <section>
      <ExpenseOutput />
    </section>

    <section>
      <MonthSummaryCard :totalIncomes="formatarValor(dashboard.totalIncomes)" :totalExpenses="formatarValor(dashboard.totalExpenses)"
        :totalSavings="formatarValor(dashboard.totalSavings)" :balance="formatarValor(dashboard.balance)" />
    </section>

  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

section {
  padding: 1rem 1rem .5rem;
}

#cards-expenses {
  display: flex;
  justify-content: center;
}

.card-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 1000px;
  width: 100%;
}

@media (max-width: 1024px) {
  .card-container {
    gap: 1rem;
  }
}
</style>
