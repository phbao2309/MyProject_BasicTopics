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
            findpivot(array, i, j) {
                let firstkey = array[i].data;
                let k = i + 1;
                while ((k <= j) && (array[k].data === firstkey)) {
                    k++;
                }
                if (k > j) {
                    return -1;
                } else if (array[k].data > firstkey) {
                    return k;
                } else {
                    return i;
                }
            },
            async partition(array, i, j, pivot, colors, pivotidx) {
                let L = i;
                let R = j;
                while (L < R) {
                    
                    while (array[L].data < pivot) {
                        // tô màu con trái
                        L === pivotidx ? array[L].color = colors.pivot : array[L].color = colors.run;
                        L++;

                        await sleep(100);

                        if (this.status === 1) await this.pauser(); // stop
                    }
                    while (array[R].data >= pivot) {
                        R--;

                        // tô màu cho phần tử con phải
                        array[R].color = colors.run;
                        await sleep(100);

                        if (this.status === 1) await this.pauser(); // stop
                    }
                    if (L < R) {
                        // đánh dấu phần tử lớn hơn pivot
                        L === pivotidx ? array[L].color = colors.pivot : array[L].color = colors.selected;
                        
                        // đánh dấu phần tử nhỏ hơn pivot
                        array[R].color = colors.selected;
                        await sleep(200);

                        if (this.status === 1) await this.pauser(); // stop

                        // tạo hiệu ứng chuyển đổi
                        let findspeed = R - L;
                        for (let speed = 0; speed < findspeed * 8; speed++) {
                            array[L].x += 5;
                            array[R].x -= 5;
                            await sleep(20);
                        }

                        // hủy hiệu ứng màu
                        for (let x = pivotidx + 1; x <= L; x++) {
                            array[x].color = colors.default;
                        }
                        for (let y = j; y >= R; y--) {
                            array[y].color = colors.default;
                        }

                        // swap
                        let temp = array[L].data;
                        array[L].data = array[R].data;
                        array[R].data = temp;

                        // trả lại vị trí ban đầu cho các phần tử
                        array[L].x -= 40 * findspeed;
                        array[R].x += 40 * findspeed;
                    }

                    // hủy hiệu ứng màu
                    for (let x = pivotidx + 1; x < L; x++) {
                        array[x].color = colors.default;
                    }
                    for (let y = j; y > R; y--) {
                        array[y].color = colors.default;
                    }
                }
                array[i].color = colors.default;
                return L;
            },
            async quicksort(array, i, j, colors) {
                let pivot;
                let k;
                let pivotidx = await this.findpivot(array, i, j);
                if (pivotidx != -1) {
                    pivot = array[pivotidx].data;
                    // đánh dấu phần tử pivot
                    array[pivotidx].color = colors.pivot;

                    k = await this.partition(array, i, j, pivot, colors, pivotidx);

                    // hủy đánh dấu
                    array[pivotidx].color = colors.default;

                    await this.quicksort(array, i, k-1, colors);
                    await this.quicksort(array, k, j, colors);
                }
            },
            async start() {
                this.quicksort(this.array, 0 ,this.array.length - 1, this.colors);
            },
        }
    }
</script>