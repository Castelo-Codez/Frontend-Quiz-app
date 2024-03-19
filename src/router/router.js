import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        name: "home",
        path: "/",
        component: () => import("/src/views/Home.vue"),
    },
    {
        name: "quiz",
        path: "/quiz/:id",
        component: () => import("/src/views/Quiz.vue"),
    },
];

const $router = createRouter({
    history: createWebHistory(),
    routes,
});

export default $router;
