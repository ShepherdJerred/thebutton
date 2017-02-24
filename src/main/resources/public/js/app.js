"use strict";

Vue.component('app-container', {
    template: '<div><div class="pure-u-1-4"></div><div class="pure-u-1-2"><div v-on:click="increment"><app-button :count="count"></app-button></div><app-progress :count="count" :maxCount="maxCount"></app-progress></div></div>',
    data: function () {
        return {
            count: 0,
            maxCount: 100000
        }
    },
    methods: {
        increment: function () {
            if (this.count < this.maxCount) {
                this.count++;
                this.$http.post("/api/incrementPressCount/").then(res => {
                    console.log(res.body);
                });
            }
        },
        fetchPressCount: function () {
            this.$http.get("/api/getPressCount/").then(res => {
                if (res.body > this.count) {
                    this.count = res.body;
                }
                console.log("Count: " + res.body);
            });
        }
    },
    created: function () {
        this.fetchPressCount();
        setInterval(this.fetchPressCount, 1000);
    }
});

Vue.component('app-button', {
    template: '<div class="button-container"><div class="button-outer"><div class="button-inner"></div></div></div>'
});

Vue.component('app-progress', {
    props: ['count', 'maxCount'],
    template: '<div class="progress-container"><div class="progress-background"><div class="progress-inner" :style="width"><span class="progress-text">{{ displayCount }}</span></div></div></div>',
    computed: {
        displayCount: function () {
            if (this.count === 0) {
                return "";
            } else {
                return this.count;
            }
        },
        percent: function () {
            // Multiply maxCount by 100 so we get a percent
            // Multiply by 10 then divide by 10 so we round to one decimal place
            return Math.round((this.count / this.maxCount * 100 * 10)) / 10;
        },
        width: function () {
            let width = {};
            width.width = this.percent + '%';
            return width;
        }
    }
});

Vue.component('app-users', {
    template: '<div class="active-users"><p>There <span v-if="otherUsers == 1">is</span><span v-else>are</span> {{ otherUsers }} other<span v-if="otherUsers != 1">s</span> here now</p></div>',
    data: function () {
        return {
            users: 1,
        }
    },
    methods: {
        fetchUsers: function () {
            this.$http.get("/api/getActiveUsers/").then(res => {
                this.users = res.body;
                console.log("Users: " + res.body);
            });
        }
    },
    computed: {
        otherUsers: function () {
            if (this.users == 0) {
                return 0;
            }
            return this.users - 1;
        }
    },
    created: function () {
        this.fetchUsers();
        setInterval(this.fetchUsers, 5000);
    }
});

Vue.component('app-leaderboard', {
    template: '<div class="pure-u-1"><h1>Leaderboard</h1><table></table></div>',
    data: function () {
        return {
            users: ['AAA', 'BBB'],
        }
    },
});

Vue.component('sj-footer', {
    template: "<div class='pure-u-1 footer'><div class='pure-u-1-2'><div class='attribution'>Site created by <a href='http://shepherdjerred.com'>Jerred Shepherd</a></div></div></div>"
});

const thebutton = {
    template: "<div><app-container></app-container><div class='pure-u-1'><app-users></app-users></div><div class='pure-u-1'></div></div>"

};

const leaderboard = {
    template: "<div><app-leaderboard></app-leaderboard><div class='pure-u-1'><div class='link-wrapper'><router-link to='/' class='button'>Back to The Button</router-link></div></div></div>"
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