Vue.component('app-container', {
    template: '<div class="pure-g"><div class="pure-u-1-4"></div><div class="pure-u-1-2"><app-button></app-button><app-progress></app-progress></div></div>'
});

Vue.component('app-button', {
    template: '<div class="button-container"><div class="button-outer"><div v-on:click="increment" class="button-inner"><span class="button-text">{{ count }}</span></div></div></div>',
    data: function () {
        return {
            count: 0
        }
    },
    methods: {
        increment: function () {
            this.count += 1;
            this.$emit('increment');
        }
    }
});

Vue.component('app-progress', {
    template: '<div class="progress-container"><div class="progress-background"><div class="progress-inner"><span class="progress-text">{{ count }}</span></div></div></div>',
    data: function () {
        return {
            count: 0,
            maxCount: 100
        }
    },
    methods: {

        update: function () {
            // We should do math and update the progress bar here
            this.count++;
        }
    }
});

var app = new Vue({
    el: '#app'
});
