<template>
    <div class="progress-container">
        <div class="progress-background">
            <div class="progress-inner" :style="width">
            <span class="progress-text">
                {{ displayCount }}
            </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['count', 'maxCount'],
        computed: {
            displayCount: function () {
                if (this.count === 0) {
                    return "";
                } else {
                    return this.count;
                }
            },
            percent: function () {
                // Multiply maxCount by 100 so we get a percent
                // Multiply by 10 then divide by 10 so we round to one decimal place
                return Math.round((this.count / this.maxCount * 100 * 10)) / 10;
            },
            width: function () {
                let width = {};
                width.width = this.percent + '%';
                return width;
            }
        }
    }
</script>