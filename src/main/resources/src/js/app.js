"use strict";

import Vue from 'vue/dist/vue.common';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

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