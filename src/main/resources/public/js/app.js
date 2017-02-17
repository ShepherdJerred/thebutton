Vue.component('app-container', {
    template: '<div class="pure-g"><div class="pure-u-1-4"></div><div class="pure-u-1-2"><app-button-container></app-button-container><app-progress></app-progress></div></div>'
})

Vue.component('app-button-container', {
    template: '<div class="button-container"><app-button></app-button></div>'
});

Vue.component('app-button', {
    template: '<div class="button-outer"><div class="button-inner"></div></div>'
});

Vue.component('app-progress', {
    template: '<div class="button-progress"><div class="button-progress-inner"></div></div>'
});

var app = new Vue({
    el: '#app'
});