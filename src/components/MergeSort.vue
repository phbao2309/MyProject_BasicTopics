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
            async merge(array, l, m, r, colors) {
                let i;
                let j;
                let k;

                let n1 = m - l + 1;
                let n2 = r - m;

                // tạo các mảng tạm để lưu các phần tử
                let L = [];
                let R = [];

                if (this.status === 1) await this.pauser(); // stop

                // copy dữ liệu sang mảng tạm
                for (i = 0; i < n1; i++) {
                    L[i] = array[l + i].data;

                    // tạo hiệu ứng chia mảng bên trái
                    array[l + i].color = colors.left;

                    // tạo hiệu ứng thêm mảng con trái vào arr
                    for(let speed = 0; speed < 10; speed++) {
                        array[l + i].y += 30;
                        await sleep((this.speed / 5) / this.inputValue);
                    }
                    if (this.status === 1) await this.pauser(); // stop
                }

                for (j = 0; j < n2; j++) {
                    R[j] = array[m + 1 + j].data;

                    // tạo hiệu ứng chia mảng bên phải
                    array[m + 1 + j].color = colors.right;

                    // tạo hiệu ứng thêm mảng con phải vào arr
                    for(let speed = 0; speed < 10; speed++) {
                        array[m + 1 + j].y += 30;
                        await sleep((this.speed / 5) / this.inputValue);
                    }
                    if (this.status === 1) await this.pauser(); // stop
                }

                // gọp 2 mảng tạm vừa rồi vào mảng arr
                i = 0;
                j = 0;
                k = l;

                while (i < n1 && j < n2) {
                    if (L[i] <= R[j]) {
                        array[k].data = L[i];
                        i++;

                        // tạo hiệu ứng thêm từ mảng L[i] vào arr[k]
                        for(let speed = 0; speed < 10; speed++) {
                            array[k].y -= 30;
                            await sleep((this.speed / 5) / this.inputValue);
                        }
                        
                        // hiển thị arr và đánh dấu
                        array[k].color = colors.sorted;

                        if (this.status === 1) await this.pauser(); // stop
                    } else {
                        array[k].data = R[j];
                        j++;

                        // tạo hiệu ứng thêm từ mảng R[i] vào arr[k]
                        for(let speed = 0; speed < 10; speed++) {
                            array[k].y -= 30;
                            await sleep((this.speed / 5) / this.inputValue);
                        }
                        // hiển thị arr và đánh dấu
                        array[k].color = colors.sorted;         
                        
                        if (this.status === 1) await this.pauser(); // stop
                    }
                    k++;
                    await sleep(this.speed / this.inputValue);
                }

                // copy các phần tử còn lại của mảng L vào arr nếu có
                while (i < n1) {
                    array[k].data = L[i];

                    // tạo hiệu ứng thêm từ mảng L[i] vào arr[k]
                    for(let speed = 0; speed < 10; speed++) {
                        array[k].y -= 30;
                        await sleep((this.speed / 5) / this.inputValue);
                    }
                    // hiển thị arr và đánh dấu
                    array[k].color = colors.sorted;

                    if (this.status === 1) await this.pauser(); // stop
                    
                    i++;
                    k++;
                }

                // copy các phần tử còn lại của mảng R vào arr nếu có
                while (j < n2) {
                    array[k].data = R[j];

                    // tạo hiệu ứng thêm từ mảng R[i] vào arr[k]
                    for(let speed = 0; speed < 10; speed++) {
                        array[k].y -= 30;
                        await sleep((this.speed / 5) / this.inputValue);
                    }
                    // hiển thị arr và đánh dấu
                    array[k].color = colors.sorted;

                    if (this.status === 1) await this.pauser(); // stop

                    j++;
                    k++;
                }
            },
            async mergesort(array, l, r, colors) {
                if (l < r) {
                    // tránh tràn số khi l và r lớn
                    let m = parseInt(l + (r - l) / 2);

                    // gọi hàm đệ quy tiếp tục chia đôi từng mảng
                    await this.mergesort(array, l, m, colors);
                    await this.mergesort(array, m + 1, r, colors);

                    await this.merge(array, l, m, r, colors);
                }
            },
            async start() {
               this.mergesort(this.array, 0, this.array.length - 1, this.colors);
            },
        },
    }
</script>