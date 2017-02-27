"use strict";

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './views/App.vue';
import TheButton from './views/TheButton.vue';
import Leaderboard from './views/Leaderboard.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
    {
        path: '/',
        component: TheButton
    },
    {
        path: '/leaderboard',
        component: Leaderboard
    }
];

const router = new VueRouter({
    routes
});

const app = new Vue({
    router
}).$mount("#app");