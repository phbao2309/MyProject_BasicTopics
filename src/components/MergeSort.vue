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

                // t???o c??c m???ng t???m ????? l??u c??c ph???n t???
                let L = [];
                let R = [];

                if (this.status === 1) await this.pauser(); // stop

                // copy d??? li???u sang m???ng t???m
                for (i = 0; i < n1; i++) {
                    L[i] = array[l + i].data;

                    // t???o hi???u ???ng chia m???ng b??n tr??i
                    array[l + i].color = colors.left;

                    // t???o hi???u ???ng th??m m???ng con tr??i v??o arr
                    for(let speed = 0; speed < 10; speed++) {
                        array[l + i].y += 30;
                        await sleep((this.speed / 5) / this.inputValue);
                    }
                    if (this.status === 1) await this.pauser(); // stop
                }

                for (j = 0; j < n2; j++) {
                    R[j] = array[m + 1 + j].data;

                    // t???o hi???u ???ng chia m???ng b??n ph???i
                    array[m + 1 + j].color = colors.right;

                    // t???o hi???u ???ng th??m m???ng con ph???i v??o arr
                    for(let speed = 0; speed < 10; speed++) {
                        array[m + 1 + j].y += 30;
                        await sleep((this.speed / 5) / this.inputValue);
                    }
                    if (this.status === 1) await this.pauser(); // stop
                }

                // g???p 2 m???ng t???m v???a r???i v??o m???ng arr
                i = 0;
                j = 0;
                k = l;

                while (i < n1 && j < n2) {
                    if (L[i] <= R[j]) {
                        array[k].data = L[i];
                        i++;

                        // t???o hi???u ???ng th??m t??? m???ng L[i] v??o arr[k]
                        for(let speed = 0; speed < 10; speed++) {
                            array[k].y -= 30;
                            await sleep((this.speed / 5) / this.inputValue);
                        }
                        
                        // hi???n th??? arr v?? ????nh d???u
                        array[k].color = colors.sorted;

                        if (this.status === 1) await this.pauser(); // stop
                    } else {
                        array[k].data = R[j];
                        j++;

                        // t???o hi???u ???ng th??m t??? m???ng R[i] v??o arr[k]
                        for(let speed = 0; speed < 10; speed++) {
                            array[k].y -= 30;
                            await sleep((this.speed / 5) / this.inputValue);
                        }
                        // hi???n th??? arr v?? ????nh d???u
                        array[k].color = colors.sorted;         
                        
                        if (this.status === 1) await this.pauser(); // stop
                    }
                    k++;
                    await sleep(this.speed / this.inputValue);
                }

                // copy c??c ph???n t??? c??n l???i c???a m???ng L v??o arr n???u c??
                while (i < n1) {
                    array[k].data = L[i];

                    // t???o hi???u ???ng th??m t??? m???ng L[i] v??o arr[k]
                    for(let speed = 0; speed < 10; speed++) {
                        array[k].y -= 30;
                        await sleep((this.speed / 5) / this.inputValue);
                    }
                    // hi???n th??? arr v?? ????nh d???u
                    array[k].color = colors.sorted;

                    if (this.status === 1) await this.pauser(); // stop
                    
                    i++;
                    k++;
                }

                // copy c??c ph???n t??? c??n l???i c???a m???ng R v??o arr n???u c??
                while (j < n2) {
                    array[k].data = R[j];

                    // t???o hi???u ???ng th??m t??? m???ng R[i] v??o arr[k]
                    for(let speed = 0; speed < 10; speed++) {
                        array[k].y -= 30;
                        await sleep((this.speed / 5) / this.inputValue);
                    }
                    // hi???n th??? arr v?? ????nh d???u
                    array[k].color = colors.sorted;

                    if (this.status === 1) await this.pauser(); // stop

                    j++;
                    k++;
                }
            },
            async mergesort(array, l, r, colors) {
                if (l < r) {
                    // tr??nh tr??n s??? khi l v?? r l???n
                    let m = parseInt(l + (r - l) / 2);

                    // g???i h??m ????? quy ti???p t???c chia ????i t???ng m???ng
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