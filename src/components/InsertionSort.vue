<template>
    <div class="control">
        <p 
            id="play"
            :class="{'control-item': displayPlay}"
            @click="play()"
        ><font-awesome-icon icon="fa-solid fa-circle-play" size="2x" /></p>
        <p
            :class="{'control-item': displayPause}"
            @click="pause()"
        ><font-awesome-icon icon="fa-solid fa-circle-pause" size="2x" /></p>

        <input 
            type="range" 
            class="form-range" 
            min="1" max="3" step="1" 
            id="customRange3"
            v-model="inputValue"
        >
        <p class="fast-number">{{inputValue}}x</p>
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
                displayPause: false,
                displayPlay: true,
                inputValue: 2,
                speed: 200,
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
            play() {
                this.displayPlay = true;
                this.displayPause = false;
            },
            pause() {
                this.displayPlay = false;
                this.displayPause = true;
                this.status = 1;
            },
            async start() {
                let length = this.array.length;
                for (let i = 0; i < length - 1; i++) {
                    for (let j = i + 1; j > 0; j--) {
                        if (this.array[j].data < this.array[j-1].data) {
                            // đánh dấu phần tử
                            this.array[j].color = this.colors.selected;
                            await sleep(this.speed / this.inputValue);
                            this.array[j-1].color = this.colors.run;
                            await sleep(this.speed / this.inputValue);

                            if (this.status === 1) await this.pauser(); // stop


                            // tạo hiệu ứng transform
                            for (let speed = 0; speed < 8; speed++) {
                                this.array[j].x -= 5;
                                this.array[j-1].x += 5;
                                await sleep((this.speed / 5) / this.inputValue);
                            }

                            // swap
                            let temp = this.array[j].data;
                            this.array[j].data = this.array[j-1].data;
                            this.array[j-1].data = temp;

                            // trả lại vị trí ban đầu
                            this.array[j].x += 40;
                            this.array[j-1].x -= 40;

                        }
                        // đánh dấu phần tử đã được sắp xếp
                        this.array[j].color = this.colors.sorted;
                        }
                    this.array[0].color = this.colors.sorted; // gán cứng
                }
            },
        }
    }
</script>