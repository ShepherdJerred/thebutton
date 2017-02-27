<template>
    <div class="active-users">
        <p>There <span v-if="otherUsers == 1">is</span><span v-else>are</span> {{ otherUsers }} other<span
                v-if="otherUsers != 1">s</span> here now</p>
    </div>
</template>

<script>
    export default {
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
    }
</script>