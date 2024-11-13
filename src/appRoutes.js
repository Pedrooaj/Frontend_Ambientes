import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import Adicionar from "./pages/Adicionar.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/adicionar", component:  Adicionar}
];


export const router = createRouter({
    history: createWebHistory(),
    routes
});