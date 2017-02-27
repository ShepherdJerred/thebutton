"use strict";

import Vue from 'vue';
import VueRouter from'vue-router';
import VueResource from'vue-resource';

import AppButton from'./components/AppButton.vue';
import AppContainer from'./components/AppContainer.vue';
import AppLeaderboard from'./components/AppLeaderboard.vue';
import AppProgress from'./components/AppProgress.vue';
import AppUsers from'./components/AppUsers.vue';
import SjFooter from'./components/SjFooter.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

const thebutton = {
    template: `
<div>
    <app-container/>
        <div class='pure-u-1'>
            <app-users/>
        </div>
</div>
`
};

const leaderboard = {
    template: `
<div>
    <app-leaderboard/>
    <div class='pure-u-1'>
        <div class='link-wrapper'>
            <router-link to='/' class='button'>Back to The Button</router-link>
        </div>
    </div>
</div>
`
};

const routes = [
    {path: '/', component: thebutton},
    {path: '/leaderboard', component: leaderboard}
];

const router = new VueRouter({
    routes
});

const app = new Vue({
    router,
    components: {
        AppButton,
        AppContainer,
        AppLeaderboard,
        AppProgress,
        AppUsers,
        SjFooter
    }
}).$mount("#app");