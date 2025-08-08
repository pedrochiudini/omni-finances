<script setup>
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();

function hadleLogout() {
    auth.logout();
}
</script>

<template>
    <header class="navbar">
        <div class="containers container">
            <div class="logo">
                <img src="../assets/logo.svg" alt="Logo" />
                <span>MyFinances</span>
            </div>
            <div :onclick="hadleLogout" class="logout">
                <!-- Logout icon (outline) - use `color` or CSS classes to change the color -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="false"
                    role="img">
                    <title>Logout</title>
                    <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                        stroke-linejoin="round">
                        <!-- "porta" -->
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <path d="M16 17l5-5-5-5" />
                        <path d="M21 12H9" />
                    </g>
                </svg>
            </div>
        </div>
    </header>
</template>

<style scoped>
.navbar {
    background: #1d1c1ce8;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    width: 100%;
}

.containers {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo img {
    width: 40px;
}

.logo img:hover {
    cursor: pointer;
}

span {
    font-size: 1rem;
    color: #fff;
    font-weight: 500;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    letter-spacing: 1px;
}

.nav-links a {
    margin-left: 20px;
    text-decoration: none;
    color: #444;
    font-weight: 500;
}

.nav-links .active {
    color: #007bff;
}

.logout {
    cursor: pointer;
}

/* Responsividade */
@media (max-width: 768px) {
    .nav-links {
        margin-top: 0.5rem;
        width: 100%;
        justify-content: flex-start;
    }

    .logo span {
        font-size: 1rem;
    }

    .logo img {
        width: 35px;
    }
}
</style>
