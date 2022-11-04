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
</template>

<script>
    import heapsort from '../utils/heapsort';

    export default {
        props: ['array', 'colors'],
        methods: {
            async start() {
                await heapsort(this.array.length, this.array, this.colors);
            },
        }
    }
</script>