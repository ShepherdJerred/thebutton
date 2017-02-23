"use strict";

Vue.component('app-container', {
    template: '<div class="pure-g"><div class="pure-u-1-4"></div><div class="pure-u-1-2"><div v-on:click="increment"><app-button :count="count"></app-button></div><app-progress :count="count" :maxCount="maxCount"></app-progress></div></div>',
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
    template: '<div class="active-users"><p>There are {{ otherUsers }} others clicking right now</p></div>',
    data: function data() {
        return {
            users: 0
        };
    },
    methods: {
        fetchUsers: function fetchUsers() {
            var _this2 = this;

            this.$http.get("/api/getActiveUsers/").then(function (res) {
                if (res.body > _this2.count) {
                    _this2.count = res.body;
                }
                console.log(res.body);
            });
        }
    },
    computed: {
        otherUsers: function otherUsers() {
            if (this.users - 1 < 0) {
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

Vue.component('sj-footer', {
    template: '<div class="pure-u-1 footer"><div class="pure-u-1-2"><div class="attribution">Site created by <a href="http://shepherdjerred.com">Jerred Shepherd</a></div></div></div>'
});

var app = new Vue({
    el: '#app'
});

//# sourceMappingURL=app.js.map

//# sourceMappingURL=app.js.map

//# sourceMappingURL=app.js.map