"use strict";

Vue.component('app-container', {
    template: "\n<div>\n    <div class=\"pure-u-1-4\"></div>\n    <div class=\"pure-u-1-2\">\n        <div v-on:click=\"increment\">\n            <app-button :count=\"count\"/>\n        </div>\n        <app-progress :count=\"count\" :maxCount=\"maxCount\"/>\n    </div>\n</div>\n",
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
                console.log("Count: " + res.body);
            });
        }
    },
    created: function created() {
        this.fetchPressCount();
        setInterval(this.fetchPressCount, 1000);
    }
});

Vue.component('app-button', {
    template: "\n<div class=\"button-container\">\n    <div class=\"button-outer\">\n        <div class=\"button-inner\"></div>\n    </div>\n</div>\n"
});

Vue.component('app-progress', {
    props: ['count', 'maxCount'],
    template: "\n<div class=\"progress-container\">\n    <div class=\"progress-background\">\n        <div class=\"progress-inner\" :style=\"width\">\n            <span class=\"progress-text\">\n                {{ displayCount }}\n            </span>\n        </div>\n    </div>\n</div>\n",
    computed: {
        displayCount: function displayCount() {
            if (this.count === 0) {
                return "";
            } else {
                return this.count;
            }
        },
        percent: function percent() {
            // Multiply maxCount by 100 so we get a percent
            // Multiply by 10 then divide by 10 so we round to one decimal place
            return Math.round(this.count / this.maxCount * 100 * 10) / 10;
        },
        width: function width() {
            var width = {};
            width.width = this.percent + '%';
            return width;
        }
    }
});

Vue.component('app-users', {
    template: "\n<div class=\"active-users\">\n    <p>There <span v-if=\"otherUsers == 1\">is</span><span v-else>are</span> {{ otherUsers }} other<span v-if=\"otherUsers != 1\">s</span> here now</p>\n</div>\n",
    data: function data() {
        return {
            users: 1
        };
    },
    methods: {
        fetchUsers: function fetchUsers() {
            var _this2 = this;

            this.$http.get("/api/getActiveUsers/").then(function (res) {
                _this2.users = res.body;
                console.log("Users: " + res.body);
            });
        }
    },
    computed: {
        otherUsers: function otherUsers() {
            if (this.users == 0) {
                return 0;
            }
            return this.users - 1;
        }
    },
    created: function created() {
        this.fetchUsers();
        setInterval(this.fetchUsers, 5000);
    }
});

Vue.component('app-leaderboard', {
    template: "\n<div class=\"pure-u-1\">\n    <h1>Leaderboard</h1>\n    <table></table>\n</div>\n",
    data: function data() {
        return {
            users: ['AAA', 'BBB']
        };
    }
});

Vue.component('sj-footer', {
    template: "\n<div class='pure-u-1 footer'>\n    <div class='pure-u-1-2'>\n        <div class='attribution'>\n            Site created by <a href='http://shepherdjerred.com'>Jerred Shepherd</a>\n        </div>\n    </div>\n</div>"
});

var thebutton = {
    template: "\n<div>\n    <app-container/>\n        <div class='pure-u-1'>\n            <app-users/>\n        </div>\n</div>\n"
};

var leaderboard = {
    template: "\n<div>\n    <app-leaderboard/>\n    <div class='pure-u-1'>\n        <div class='link-wrapper'>\n            <router-link to='/' class='button'>Back to The Button</router-link>\n        </div>\n    </div>\n</div>\n"
};

var routes = [{ path: '/', component: thebutton }, { path: '/leaderboard', component: leaderboard }];

var router = new VueRouter({
    routes: routes
});

var app = new Vue({
    router: router
}).$mount("#app");