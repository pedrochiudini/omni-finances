<script setup>
defineProps({
    title: String,
    dateExpense: String,
    value: String,
    icon: String,
    bgColorClass: String,
    textColorClass: String
})
</script>

<template>
    <div class="cards">
        <div class="card-header">
            <h3>{{ title }}</h3>
            <div :class="['icon-circle', bgColorClass]">
                <img :src="icon" class="icon" />
            </div>
        </div>

        <div class="card-body">
            <div class="row">
                <span class="goal-amount text-gray">R$ {{ value }}</span>
            </div>
        </div>

        <div class="card-body">
            <div class="row">
                <span class="goal-amount text-gray">{{ dateExpense }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cards {
    background-color: #313030ce;
    border-radius: 8px;
    padding: 12px 20px;
    max-width: 945px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
}

@media (min-width: 1024px) {
    .card {
        width: 31%;
    }
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: -7px;
}

.card-header h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.icon-circle {
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon {
    width: 20px;
    height: 20px;
}

.card-body .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
}

.goal-amount {
    font-weight: 600;
}

.used-amount {
    font-weight: 600;
}

.percent-text {
    text-align: center;
    font-size: 12px;
    color: #6b7280;
    margin-top: 6px;
}

/* Colors */
.bg-red {
    background-color: #fee2e2;
}

.bg-orange {
    background-color: #ffedd5;
}

.bg-green {
    background-color: #dcfce7;
}

.text-red {
    color: #dc2626;
}

.text-orange {
    color: #ea580c;
}

.text-gray {
    color: #8f8c8c;
}

.bar-red {
    background-color: #dc2626;
}

.bar-orange {
    background-color: #ea580c;
}

.bar-green {
    background-color: #16a34a;
}
</style>