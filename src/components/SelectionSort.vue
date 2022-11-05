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
                let lowkey;
                let lowkeyindex;
                let length = this.array.length;
                
                for (let i = 0; i < length - 1; i++) {
                    lowkey = this.array[i].data;
                    lowkeyindex = i;
                    
                    // đánh dấu phần tử lowkey đầu tiên
                    this.array[i].color = this.colors.selected;
                
                    for (let j = i + 1; j < length; j++) {
                        // tạo hiệu ứng duyệt qua phần tử
                        this.array[j].color = this.colors.run;
                        if (this.status === 1) await this.pauser(); // stop
                        await sleep(100);
                        this.array[j].color = this.colors.default;

                
                        if (this.array[j].data < lowkey) {
                
                            // gán lại màu cho phần tử lowkey đã chọn trước đó
                            this.array[lowkeyindex].color = this.colors.default;
                            await sleep(100);
                
                            // gán lại lowkey và lowkeyindex
                            lowkey = this.array[j].data;
                            lowkeyindex = j;
                
                            // đánh dấu phần tử lowkey tiếp theo
                            this.array[lowkeyindex].color = this.colors.selected;
                            await sleep(100);
                        }
                    }
                
                    // tạo hiệu ứng chuyển đổi
                    this.array[i].color = this.colors.selected;
                    // tính khoảng cách giữa lowkey mới và lowkey củ
                    let findspeed = (this.array[lowkeyindex].x - this.array[i].x) / 40;
                    
                    for (let speed = 0; speed < findspeed * 8; speed++ ) {
                        this.array[lowkeyindex].x -= 5;
                        this.array[i].x += 5;
                        await sleep(20);
                    }
                
                    // swap
                    let temp = this.array[lowkeyindex].data;
                    this.array[lowkeyindex].data = this.array[i].data;
                    this.array[i].data = temp;
                
                    // khôi phục transform cho các phần tử
                    this.array[lowkeyindex].x += 40 * findspeed;
                    this.array[i].x -= 40 * findspeed;
                
                    // tô lại màu
                    this.array[lowkeyindex].color = this.colors.default;
                    this.array[i].color = this.colors.sorted;
                }
                this.array[length - 1].color = this.colors.sorted;
            },
        }
    }
</script>