<template>
    <div class="control">
        <button 
            id="play" class="control-item"
        >Play</button>
        <button
            class="control-item" 
            @click="pause()"
        >Pause</button>
    </div>

    <div class="element" style="height: 250px;"></div>
    <div
        class="element"
        v-for="(element, index) in this.array" :key="index"
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
    import { sleep } from '../utils/tools';

    export default {
        props: ['array', 'colors'],
        data() {
            return {
                status: 0,
            }
        },
        methods: {
            pauser() {
                return new Promise(resolve => {
                    this.status = 0;
                    let playbuttonClick = function() {
                        document.getElementById("play").removeEventListener("click", playbuttonClick);
                        resolve("resolved");
                    }
                    document.getElementById("play").addEventListener("click", playbuttonClick)
                })
            },
            pause() {
                this.status = 1;
            },
            async start() {
                let length = this.array.length;
                for (let i = 0; i < length - 1; i++) {
                    for (let j = length - 1; j > i; j--) {
                        // đánh dấu 2 phần tử được chọn
                        this.array[j].color = this.colors.run;
                        this.array[j-1].color = this.colors.run;
                        await sleep(100);

                        if (this.status === 1) await this.pauser(); // stop

                        if (this.array[j].data < this.array[j-1].data) {

                            // tạo hiệu ứng chuyển đổi
                            for(let speed = 0; speed < 8; speed++) {
                                this.array[j].x -= 5;
                                this.array[j-1].x += 5;
                                await sleep(20);
                            }

                            // swap
                            let temp = this.array[j].data;
                            this.array[j].data = this.array[j-1].data;
                            this.array[j-1].data = temp;

                            // trả lại đúng vị trí của phần tử
                            this.array[j].x += 40;
                            this.array[j-1].x -= 40;
                        }

                        // hủy đánh dấu
                        this.array[j].color = this.colors.default;
                    }
                    this.array[i].color = this.colors.sorted;
                }
                this.array[length - 1].color = this.colors.sorted;
            }
        }
    }
</script>