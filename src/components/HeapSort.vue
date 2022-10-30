<template>
    <h1>{{length}}</h1>
    <h1>{{array}}</h1>
    <h1>Heap Sort</h1>
    <button @click="submit()">click</button>
</template>

<script>
    export default {
        props: ['array'],
        data() {
            return {
                length: 0,
            }
        },
        methods: {
            submit() {
                this.length = this.array.length;
            }
        }
    }
</script>