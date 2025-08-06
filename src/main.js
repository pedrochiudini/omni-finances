import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export function verifyToken(err) {
  if (err.response?.data?.message?.toLowerCase().includes("expirado")) {
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }
}

export function now() {
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  const dataFormatada = `${ano}-${mes}-${dia}`;

  return dataFormatada;
}

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(Vue3Toastify, {
  autoClose: 3000,
});

app.mount("#app");
