<template>
    <div class="element" style="height: 250px;"></div>
    <div
        class="element"
        v-for="(element, index) in array" :key="index"
        :style="{
            transform: `translate(${element.x}px, ${element.y}px)`,
        }"
    >
        <div
            class="element-item"
            :style="{
                backgroundColor: `${element.color}`,
                height: `${element.data * 10}px`,
            }"
        >
        </div>
        <div class="element-item-number">{{ element.data }}</div>
    </div>
    <div class="main-element"></div>
    <div class="main-element">
        <div
            class="element"
            v-for="(element, index) in arrayTemp" :key="index"
            :style="{
                transform: `translate(${element.x}px, ${element.y}px)`,
            }"
            >
            <div
                class="element-item"
                :style="{
                    backgroundColor: `${element.color}`,
                    height: `${element.data * 10}px`,
                }"
            >
            </div>
            <div class="element-item-number">{{ element.data }}</div>
        </div>
    </div>
</template>

<script>
    import mergesort from '../utils/mergesort';

    export default {
        props: ['array', 'colors'],
        data() {
            return {
                arrayTemp: [],
            }
        },
        methods: {
            async start() {
            //    mergesort(this.array.length, this.array, this.colors);
                mergesort(this.array.length, this.array, this.colors, this.arrayTemp);
            },
        },
    }
</script>

<style scoped>
    .main-element {
        margin-top: 30px;
        height: 220px;
    }
</style>