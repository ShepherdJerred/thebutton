"use strict";

Vue.component('app-container', {
    template: '<div><div class="pure-u-1-4"></div><div class="pure-u-1-2"><div v-on:click="increment"><app-button :count="count"></app-button></div><app-progress :count="count" :maxCount="maxCount"></app-progress></div></div>',
    data: function data() {
        return {
            count: 0,
            maxCount: 100000
        };
    },
    methods: {
        increment: function increment() {
            if (this.count < this.maxCount) {
                this.count++;
                this.$http.post("/api/incrementPressCount/").then(function (res) {
                    console.log(res.body);
                });
            }
        },
        fetchPressCount: function fetchPressCount() {
            var _this = this;

            this.$http.get("/api/getPressCount/").then(function (res) {
                if (res.body > _this.count) {
                    _this.count = res.body;
                }
                console.log(res.body);
            });
        }
    },
    created: function created() {
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
        displayCount: function displayCount() {
            if (this.count === 0) {
                return "";
            } else {
                return this.count;
            }
        },
        percent: function percent() {
            return Math.round(this.count / this.maxCount * 100);
        },
        width: function width() {
            var width = {};
            width.width = this.percent + '%';
            return width;
        }
    }
});

Vue.component('app-users', {
    template: '<div class="active-users"><p>There <span v-if="otherUsers == 1">is</span><span v-else>are</span> {{ otherUsers }} other<span v-if="otherUsers != 1">s</span> clicking right now</p></div>',
    data: function data() {
        return {
            users: 0
        };
    },
    methods: {
        fetchUsers: function fetchUsers() {
            var _this2 = this;

            this.$http.get("/api/getActiveUsers/").then(function (res) {
                if (res.body > _this2.users) {
                    _this2.users = res.body;
                }
                console.log(res.body);
            });
        }
    },
    computed: {
        otherUsers: function otherUsers() {
            if (this.users == 0) {
                return 0;
            } else {
                return this.users - 1;
            }
        }
    },
    created: function created() {
        this.fetchUsers();
        setInterval(this.fetchUsers, 5000);
    }
});

Vue.component('app-leaderboard', {
    template: '<div class="pure-u-1"><h1>Leaderboard</h1><table></table></div>',
    data: function data() {
        return {
            users: ['AAA', 'BBB']
        };
    }
});

Vue.component('sj-footer', {
    template: "<div class='pure-u-1 footer'><div class='pure-u-1-2'><div class='attribution'>Site created by <a href='http://shepherdjerred.com'>Jerred Shepherd</a></div></div></div>"
});

var thebutton = {
    template: "<div class='pure-u-1'><app-container></app-container><app-users></app-users><div class='link-wrapper'><router-link to='/leaderboard' class='button'>Leaderboard</router-link></div></div>"

};

var leaderboard = {
    template: "<div class='pure-u-1'><app-leaderboard></app-leaderboard><div class='link-wrapper'><router-link to='/' class='button'>Back to The Button</router-link></div></div>"
};

var routes = [{ path: '/', component: thebutton }, { path: '/leaderboard', component: leaderboard }];

var router = new VueRouter({
    routes: routes
});

var app = new Vue({
    router: router
}).$mount("#app");

//# sourceMappingURL=app.js.map

//# sourceMappingURL=app.js.map

//# sourceMappingURL=app.js.map