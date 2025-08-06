<script setup>
defineProps({
    title: String,
    goalPercentage: Number,
    goalValue: String,
    usedValue: String,
    percentUsed: Number,
    labelUsed: {
        type: String,
        default: 'Usado'
    },
    labelSuffix: {
        type: String,
        default: 'utilizado'
    },
    icon: String,
    bgColorClass: String,
    textColorClass: String,
    barColorClass: String
})
</script>

<template>
    <div class="card">
        <div class="card-header">
            <h3>{{ title }}</h3>
            <div :class="['icon-circle', bgColorClass]">
                <img :src="icon" class="icon" />
            </div>
        </div>

        <div class="card-body">
            <div class="row">
                <span>Meta: {{ goalPercentage }}%</span>
                <span class="goal-amount">R$ {{ goalValue }}</span>
            </div>

            <div class="row">
                <span>{{ labelUsed }}:</span>
                <span :class="['used-amount', textColorClass]">R$ {{ usedValue }}</span>
            </div>

            <div class="progress-bar">
                <div class="progress" :style="{ width: percentUsed + '%' }" :class="barColorClass"></div>
            </div>

            <div class="percent-text">{{ percentUsed }}% {{ labelSuffix }}</div>
        </div>
    </div>
</template>

<style scoped>
.card {
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    padding: 24px;
    width: 100%;
    box-sizing: border-box;
    background: #1d1c1ce8;
    margin: 0 auto;
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
    margin-bottom: 16px;
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

.progress-bar {
    width: 100%;
    height: 8px;
    background-color: #f3f4f6;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 4px;
}

.progress {
    height: 100%;
    transition: width 0.3s ease;
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

.text-green {
    color: #16a34a;
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