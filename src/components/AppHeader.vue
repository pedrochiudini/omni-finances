<script setup>

</script>

<template>
    <header class="navbar">
        <div class="container">
            <div class="logo">
                <img src="../assets/logo.svg" alt="Logo" />
                <span>MyFinances</span>
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

/* Responsividade */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
        align-items: flex-start;
    }

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
