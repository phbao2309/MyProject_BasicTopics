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
            async heapify(array, n, i, colors) {
                let largest = i; // khởi tạo root   
                let l = 2 * i + 1; // khởi tạo con trái
                let r = 2 * i + 2; // khởi tạo con phải

                // đánh dấu các phần tử largest, left, right
                array[largest].color = colors.pivot;
                if (l < n) array[l].color = colors.run;
                if (r < n) array[r].color = colors.run;
                await sleep(this.speed / this.inputValue);
                
                if (this.status === 1) await this.pauser(); // stop

                // nếu con trái lớn hơn phần tử root
                if (l < n && array[l].data > array[largest].data) {
                    largest = l;
                }

                // nếu con phải lớn hơn phần tử root
                if (r < n && array[r].data > array[largest].data) {
                    largest = r;
                }

                // nếu largest không phải là root
                if (largest != i) {

                    if (this.status === 1) await this.pauser(); // stop

                    // tạo hiệu ứng chuyển đổi
                    let findspeed = largest - i;
                    for (let speed = 0; speed < findspeed * 8; speed ++) {
                        array[i].x += 5;
                        array[largest].x -= 5;
                        await sleep((this.speed / 5) / this.inputValue);
                    }

                    array[i].x += findspeed * 5;
                    array[largest].x -= findspeed * 5;

                    

                    // swap
                    let temp = array[i].data;
                    array[i].data = array[largest].data;
                    array[largest].data = temp;

                    // trả về vị trí ban đầu của các phần tử
                    array[i].x -= 40 * findspeed;
                    array[i].x -= findspeed * 5;

                    array[largest].x += 40 * findspeed;
                    array[largest].x += findspeed * 5;

                    // tô lại màu
                    array[i].color = colors.default;
                    array[largest].color = colors.default;
                    if (l < n) array[l].color = colors.default;
                    if (r < n) array[r].color = colors.default;

                    await this.heapify(array, n, largest, colors);
                }
                
                // tô lại màu
                array[i].color = colors.default;
                array[largest].color = colors.default;
                if (l < n) array[l].color = colors.default;
                if (r < n) array[r].color = colors.default;
            },
            async heapsort(array, n, colors) {
                // build heap
                for (let i = parseInt(n / 2 - 1); i >= 0; i--) {
                    await this.heapify(array, n, i, colors);
                }

                for (let i = n - 1; i > 0; i--) {
                    // đánh dấu 2 phần tử đầu và cuối
                    array[i].color = colors.selected;
                    array[0].color = colors.selected;
                    await sleep(this.speed / this.inputValue);

                    if (this.status === 1) await this.pauser(); // stop

                    // tạo hiệu ứng đổi giữa 2 phần tử đầu và cuối
                    for (let speed = 0; speed < i * 8; speed++) {
                        array[0].x += 5;
                        array[i].x -= 5;
                        await sleep((this.speed / 5) / this.inputValue);
                    }

                    // đổi phần tử đầu và phần tử cuối
                    let temp = array[0].data;
                    array[0].data = array[i].data;
                    array[i].data = temp;

                    // hoàn hồi hiệu ứng
                    array[0].x -= 40 * i;
                    array[i].x += 40 * i;

                    await sleep(100);

                    // xóa đánh dấu
                    // đánh dấu đã sắp xếp
                    array[i].color = colors.sorted;

                    await this.heapify(array, i, 0, colors);
                }
                array[0].color = colors.sorted;
            },
            async start() {
                this.heapsort(this.array, this.array.length, this.colors);
            },
        }
    }
</script>