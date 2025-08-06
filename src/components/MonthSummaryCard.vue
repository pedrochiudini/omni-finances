<script setup>
import { ref } from 'vue';

defineProps({
    totalIncomes: String,
    totalExpenses: String,
    totalSavings: String,
    balance: String
})
</script>

<template>
    <div class="card">
        <div class="card-header">
            <div class="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-calendar" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor">
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                </svg>
                Resumo do Mês
            </div>
        </div>

        <div class="card-content">
            <div class="grid">
                <div class="summary-item">
                    <div class="amount">{{ totalIncomes }}</div>
                    <div class="label">Renda Total</div>
                </div>
                <div class="summary-item">
                    <div class="amount red">{{ totalExpenses }}</div>
                    <div class="label">Total Gasto</div>
                </div>
                <div class="summary-item">
                    <div class="amount green">{{ totalSavings }}</div>
                    <div class="label">Total Poupado</div>
                </div>
                <div class="summary-item">
                    <div class="amount blue">{{ balance }}</div>
                    <div class="label">Restante</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    background: #1d1c1ce8;
    border-radius: 8px;
    padding: 20px;
    max-width: 945px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
}

.card-header {
    padding-bottom: 16px;
}

.card-title {
    font-size: 20px;
    font-weight: 500;
    display: flex;
    align-items: center;
}

.icon-calendar {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    color: #4f46e5;
    /* Primary */
    stroke-width: 2;
}

.card-content {
    padding-top: 0;
}

.grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

.summary-item {
    text-align: center;
}

.amount {
    font-size: 24px;
    font-weight: bold;
    color: #4f46e5;
}

.label {
    font-size: 14px;
    color: #6b7280;
    margin-top: 4px;
}

/* Cores */
.red {
    color: #dc2626;
}

.green {
    color: #16a34a;
}

.blue {
    color: #2563eb;
}
</style>