<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth';
import { useDashboardStore } from '../stores/dashboard';
import api from '../api';
import { toast } from "vue3-toastify";
import { now } from '../main';
import LatestExpense from './LatestExpense.vue';

const auth = useAuthStore();
const dashboard = useDashboardStore();

const expense = ref('0,00');
const category = ref('');

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

function formatarData(data) {
    const date = new Date(data)

    if (isNaN(date)) {
        return '';
    }

    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

function allowOnlyNumbers(e) {
    const isNumber = /^[0-9]$/.test(e.key)
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab']

    // Se tentar apagar e o valor for "0,00", bloqueia
    if (e.key === 'Backspace' && expense.value === '0,00') {
        e.preventDefault()
        return
    }

    if (!isNumber && !allowedKeys.includes(e.key)) {
        e.preventDefault()
    }
}

// Formata valor como moeda
function formatCurrencyInput(e) {
    let raw = e.target.value.replace(/\D/g, '')

    // Se apagar tudo, mantém "0,00"
    if (raw.length === 0) {
        expense.value = '0,00'
        return
    }

    if (raw.length < 3) {
        raw = raw.padStart(3, '0')
    }

    const cents = raw.slice(-2)
    const reais = raw.slice(0, -2)

    expense.value = parseInt(reais).toLocaleString('pt-BR') + ',' + cents
}

function limpaCampos() {
    expense.value = '0,00';
    category.value = '';
}

async function saveExpense() {
    try {
        let monthly_output = parseFloat(expense.value.replace('.', '').replace(',', '.'));
        let date = now();
        const response = await api.post('/expenses/create', {
            user_id: auth.userId,
            amount: monthly_output,
            category: category.value,
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
            toast.error('Erro ao salvar saída.');
        }
    }
}
</script>

<template>
    <div class="card">
        <div class="card-header">
            <div class="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-plus" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                </svg>
                Adicionar Gasto
            </div>
        </div>

        <div class="card-content">
            <form class="form" @submit.prevent="saveExpense">
                <!-- Valor -->
                <div class="form-item">
                    <label for="amount">Valor</label>
                    <div class="input-group">
                        <span class="currency">R$</span>
                        <input type="text" class="input" :value="expense" @keydown="allowOnlyNumbers"
                            @input="formatCurrencyInput" placeholder="0,00" />
                    </div>
                </div>

                <!-- Categoria -->
                <div class="form-item">
                    <label for="category">Categoria</label>
                    <select id="category" v-model="category" class="input" required>
                        <option disabled value="">Selecione uma categoria</option>
                        <option value="FI">Fixos</option>
                        <option value="DE">Desejos</option>
                        <option value="PO">Poupança</option>
                    </select>
                </div>

                <!-- Botão -->
                <button type="submit" class="button">Adicionar Gasto</button>
            </form>

            <div class="recent-expenses">
                <h3>Gastos Recentes</h3>

                <div v-if="!dashboard.latestExpeses">
                    <p class="no-expenses">Nenhuma despesa encontrada.</p>
                </div>

                <div v-else v-for="(expense, index) in dashboard.latestExpeses" :key="index">
                    <LatestExpense :title="dashboard.getTitle(index)"
                        :dateExpense="formatarData(expense['reference_month'])"
                        :value="formatarValor(expense['amount'])" :icon="dashboard.getIcon(index)"
                        bgColorClass="bg-orange" textColorClass="text-orange" />
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

.icon-plus {
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

.form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-item label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
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
    width: 100%;
}

.input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

.input-with-prefix {
    position: relative;
}

.input-with-prefix .prefix {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #6b7280;
    font-size: 14px;
}

.input-with-prefix input {
    padding-left: 30px;
}

.button {
    height: 40px;
    background-color: #4f46e5;
    color: white;
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.button:hover {
    background-color: #4338ca;
}

.recent-expenses {
    margin-top: 32px;
}

.recent-expenses h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
}

.no-expenses {
    text-align: center;
    font-size: 14px;
    color: #6b7280;
    padding: 16px 0;
}
</style>