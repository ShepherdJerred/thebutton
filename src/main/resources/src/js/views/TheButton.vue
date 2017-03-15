<template>
    <div>
        <div>
            <div class="pure-u-1-4"></div>
            <div class="pure-u-1-2">
                <div v-on:click="increment">
                    <app-button :count="count"/>
                </div>
                <app-progress :count="count" :maxCount="maxCount"/>
            </div>
        </div>
        <div class='pure-u-1'>
            <div class="active-users" v-if="otherUsers != 0">
                <p>There <span v-if="otherUsers == 1">is</span><span v-else>are</span> {{ otherUsers }} other<span
                        v-if="otherUsers != 1">s</span> here now</p>
            </div>
        </div>
    </div>
</template>

<script>
    import AppButton from '../components/AppButton.vue';
    import AppProgress from '../components/AppProgress.vue';

    export default {
        components: {
            AppButton,
            AppProgress
        },
        data: function () {
            return {
                users: 1,
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
            },
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
            this.fetchPressCount();
            this.fetchUsers();
            setInterval(this.fetchPressCount, 1000);
            setInterval(this.fetchUsers, 5000);
        }
    }
</script>