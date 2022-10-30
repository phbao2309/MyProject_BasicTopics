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
    import { sleep } from '../utils/tool';

    export default {
        props: ['array', 'colors'],
        methods: {
            async start() {
                let left = 0;
                let right = this.array.length - 1;
                let k = 0;
                while (left < right) {
                    let i;
                    for (i = left; i < right; i++) {
                        // tô màu đánh dấu
                        this.array[i].color = this.colors.run;
                        this.array[i + 1].color = this.colors.run;

                        if (this.array[i].data > this.array[i + 1].data) {
                            // tạo hiệu ứng animation
                            for (let speed = 0; speed < 8; speed++) {
                                this.array[i].x += 5;
                                this.array[i + 1].x -= 5;
                                await sleep(30);
                            }

                            let temp = this.array[i].data;
                            this.array[i].data = this.array[i + 1].data;
                            this.array[i + 1].data = temp;
                            k = i;

                            // hoàn vị trí
                            this.array[i].x -= 40;
                            this.array[i + 1].x += 40;
                        }
                        this.array[i].color = this.colors.default;
                        this.array[i + 1].color = this.colors.default;
                    }        
                    right = k;
                    let j;
                    for (j = right; j > left; j--) {
                        if (this.array[j].data < this.array[j - 1].data) {
                            // tô màu đánh dấu
                            this.array[j].color = this.colors.run;
                            this.array[j - 1].color = this.colors.run;

                            // tạo hiệu ứng animation
                            for (let speed = 0; speed < 8; speed++) {
                                this.array[j].x -= 5;
                                this.array[j - 1].x += 5;
                                await sleep(30);
                            }

                            let temp = this.array[j].data;
                            this.array[j].data = this.array[j - 1].data;
                            this.array[j - 1].data = temp;
                            k = j;

                            // hoàn trả vị trí
                            this.array[j].x += 40;
                            this.array[j - 1].x -= 40;
                        }
                        this.array[j].color = this.colors.default;
                        this.array[j - 1].color = this.colors.default;
                    }
                    left = k;
                }
            },
        }
    }
</script>