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
                        document.getElementById("play").removeEventListener("click",playbuttonClick);
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
                let left = 0;
                let right = this.array.length - 1;
                let k = 0;
                while (left < right) {
                    let i;
                    for (i = left; i < right; i++) {
                        // tô màu đánh dấu
                        this.array[i].color = this.colors.run;
                        this.array[i + 1].color = this.colors.run;
                        await sleep(this.speed / this.inputValue);
                    
                        if (this.status === 1) await this.pauser();

                        if (this.array[i].data > this.array[i + 1].data) {
                            // tạo hiệu ứng animation
                            for (let speed = 0; speed < 8; speed++) {
                                this.array[i].x += 5;
                                this.array[i + 1].x -= 5;
                                await sleep((this.speed / 5) / this.inputValue);
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
                            await sleep(this.speed / this.inputValue);

                            if (this.status === 1) await this.pauser();

                            // tạo hiệu ứng animation
                            for (let speed = 0; speed < 8; speed++) {
                                this.array[j].x -= 5;
                                this.array[j - 1].x += 5;
                                await sleep((this.speed / 5) / this.inputValue);
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