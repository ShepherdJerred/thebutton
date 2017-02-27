<template>
    <div>
        <div class="pure-u-1-4"></div>
        <div class="pure-u-1-2">
            <div v-on:click="increment">
                <app-button :count="count"/>
            </div>
            <app-progress :count="count" :maxCount="maxCount"/>
        </div>
    </div>
</template>

<script>
    import AppButton from 'AppButton.vue';
    import AppProgress from 'AppProgress.vue';

    export default {
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
    }
</script>