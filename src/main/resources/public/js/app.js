"use strict";

const Vue = require('vue/dist/vue.common.js');
const VueRouter = require('vue-router');
const VueResource = require('vue-resource');

const AppButton = require('./components/AppButton.vue');
const AppContainer = require('./components/AppContainer.vue');
const AppLeaderboard = require('./components/AppLeaderboard.vue');
const AppProgress = require('./components/AppProgress.vue');
const AppUsers = require('./components/AppUsers.vue');
const SjFooter = require('./components/SjFooter.vue');

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
    router
}).$mount("#app");