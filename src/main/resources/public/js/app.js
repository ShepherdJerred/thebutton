"use strict";

Vue.component('app-container', {
    template: '<div class="pure-g"><div class="pure-u-1-4"></div><div class="pure-u-1-2"><div v-on:click="increment"><app-button :count="count"></app-button></div><app-progress :count="count" :maxCount="maxCount"></app-progress></div></div>',
    data: function () {
        return {
            count: 0,
            maxCount: 1000000000
        }
    },
    methods: {
        increment: function () {
            if (this.count < this.maxCount) {
                this.count++;
            }
        }
    }
});

Vue.component('app-button', {
    template: '<div class="button-container"><div class="button-outer"><div class="button-inner"></div></div></div>'
});

Vue.component('app-progress', {
    props: ['count', 'maxCount'],
    template: '<div class="progress-container"><div class="progress-background"><div class="progress-inner" :style="width"><span class="progress-text">{{ count }}</span></div></div></div>',
    computed: {
        percent: function () {
            return Math.round(this.count / this.maxCount * 100);
        },
        width: function () {
            let width = {};
            width.width = this.percent + '%';
            return width;
        }
    }
});

const app = new Vue({
    el: '#app'
});
