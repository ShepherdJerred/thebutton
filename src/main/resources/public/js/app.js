"use strict";

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import SjFooter from './components/SjFooter.vue';

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
    router,
    components: {
        SjFooter
    }
}).$mount("#app");