<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useDashboardStore } from '../stores/dashboard';
import api from '../api';
import { toast } from "vue3-toastify";
import { now } from '../main';

const auth = useAuthStore();
const dashboard = useDashboardStore();

const income = ref('0,00');

async function saveIncome() {
    try {
        let monthly_input = parseFloat(income.value.replace('.', '').replace(',', '.'));
        let date = now();
        const response = await api.post('/monthly-incomes/create', {
            user_id: auth.userId,
            amount: monthly_input,
            reference_month: date
        })

        if (response.data.success) {
            toast.success(response.data.message);
            await dashboard.carregarDashboard();
            limpaCampos();
        }
    } catch (err) {
        if (err.response?.data?.message) {
            toast.error(err.response.data.message);
        } else {
            toast.error('Erro ao salvar entrada.');
        }
    }
}

function limpaCampos() {
    income.value = '0,00';
}

function allowOnlyNumbers(e) {
    const isNumber = /^[0-9]$/.test(e.key);
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];

    // Se tentar apagar e o valor for "0,00", bloqueia
    if (e.key === 'Backspace' && income.value === '0,00') {
        e.preventDefault();
        return;
    }

    if (!isNumber && !allowedKeys.includes(e.key)) {
        e.preventDefault();
    }
}

// Formata valor como moeda
function formatCurrencyInput(e) {
    let raw = e.target.value.replace(/\D/g, '');

    // Se apagar tudo, mantém "0,00"
    if (raw.length === 0) {
        income.value = '0,00';
        return;
    }

    if (raw.length < 3) {
        raw = raw.padStart(3, '0');
    }

    const cents = raw.slice(-2);
    const reais = raw.slice(0, -2);

    income.value = parseInt(reais).toLocaleString('pt-BR') + ',' + cents;
}
</script>

<template>
    <div class="card">
        <div class="card-header">
            <i class="icon">💳</i>
            <h2>Renda Mensal</h2>
        </div>

        <label class="label" for="income">Digite sua renda mensal</label>

        <div class="input-group">
            <span class="currency">R$</span>
            <input type="text" class="input" :value="income" @keydown="allowOnlyNumbers" @input="formatCurrencyInput"
                placeholder="0,00" />
            <button class="btn" @click="saveIncome">Salvar Renda</button>
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
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
}

.card-header h2 {
    font-size: x-large;
    font-weight: 500;
}

.card-header .icon {
    font-size: 20px;
    margin-right: 10px;
}

.card-header h2 {
    margin: 0;
    font-size: 20px;
}

.label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
}

.input-group {
    display: flex;
    align-items: center;
    gap: 12px;
}

.currency {
    background: #555353;
    padding: 10px;
    border-right: none;
    border-radius: 6px 0 0 6px;
    color: #999;
    font-size: 14px;
}

.input {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    border-left: none;
    border-radius: 0 6px 6px 0;
    outline: none;
}

.input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

.btn {
    padding: 11px 20px;
    background: #4f46e5;
    color: white;
    border: solid 1px #4f46e5;
    border-radius: 6px;
    cursor: pointer;
    font-size: small;
    font-weight: 500;
    transition: background 0.3s;
}

.btn:hover {
    background: #4338ca;
    border: solid 1px #4338ca;
}

/* Responsividade */
@media (max-width: 600px) {
    .input-group {
        flex-direction: column;
        align-items: stretch;
    }

    .currency {
        border-radius: 6px 6px 0 0;
        border-right: none;
        text-align: center;
    }

    .input {
        border-radius: 0;
        border-left: none;
        border-right: none;
    }

    .btn {
        width: 100%;
        border-radius: 0 0 6px 6px;
        margin-top: 8px;
    }
}
</style>