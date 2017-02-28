<template>
    <div>
        <div class="pure-u-1">
            <h1>Leaderboard</h1>
            <table></table>
        </div>
        <div class='pure-u-1'>
            <div class='link-wrapper'>
                <router-link to='/' class='button'>Back to The Button</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                users: ['AAA', 'BBB'],
            }
        }
    }
</script>