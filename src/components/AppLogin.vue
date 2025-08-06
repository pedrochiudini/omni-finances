<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

import api from '../api';

const email = ref('');
const password = ref('');
const error = ref(null);

const auth = useAuthStore();

async function handleLogin() {
    try {
        const response = await api.post('/users/login', {
            email: email.value,
            password: password.value,
        })

        const token = response.data.token;
        const user = response.data.user.id;
        auth.setToken(token);
        auth.setUser(user);
    } catch (err) {
        if (err.response?.data?.message) {
            error.value = err.response.data.message;
        } else {
            error.value = 'Erro ao fazer login.';
        }
    }
}
</script>

<template>
    <div class="login-container">
        <form @submit.prevent="handleLogin" class="login-form">
            <h2>Login</h2>

            <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" id="email" v-model="email" required />
            </div>

            <div class="form-group">
                <label for="password">Senha:</label>
                <input type="password" id="password" v-model="password" required />
            </div>

            <button type="submit">Entrar</button>

            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 1rem;
}

.login-form {
    background: #1d1c1ce8;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
}

h2 {
    text-align: center;
    margin-bottom: 1rem;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.3rem;
    font-weight: bold;
}

input {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    border-left: none;
    border-radius: 0 6px 6px 0;
    outline: none;
    width: 93%;
}

.input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

button {
    width: 100%;
    padding: 0.6rem;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
}

button:hover {
    background: #4338ca;
}

.error {
    color: #4338ca;
    margin-top: 1rem;
    text-align: center;
}
</style>