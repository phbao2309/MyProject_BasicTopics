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
                        // t?? ma??u con tra??i
                        L === pivotidx ? array[L].color = colors.pivot : array[L].color = colors.run;
                        L++;

                        await sleep(this.speed / this.inputValue);

                        if (this.status === 1) await this.pauser(); // stop
                    }
                    while (array[R].data >= pivot) {
                        R--;

                        // t?? m??u cho ph???n t??? con ph???i
                        array[R].color = colors.run;
                        await sleep(this.speed / this.inputValue);

                        if (this.status === 1) await this.pauser(); // stop
                    }
                    if (L < R) {
                        // ????nh d???u ph???n t??? l???n h??n pivot
                        L === pivotidx ? array[L].color = colors.pivot : array[L].color = colors.selected;
                        
                        // ????nh d???u ph???n t??? nh??? h??n pivot
                        array[R].color = colors.selected;
                        await sleep(this.speed / this.inputValue);

                        if (this.status === 1) await this.pauser(); // stop

                        // t???o hi???u ???ng chuy???n ?????i
                        let findspeed = R - L;
                        for (let speed = 0; speed < findspeed * 8; speed++) {
                            array[L].x += 5;
                            array[R].x -= 5;
                            await sleep((this.speed / 5) / this.inputValue);
                        }

                        // h???y hi???u ???ng m??u
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

                        // tr??? l???i v??? tr?? ban ?????u cho c??c ph???n t???
                        array[L].x -= 40 * findspeed;
                        array[R].x += 40 * findspeed;
                    }

                    // h???y hi???u ???ng m??u
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
                    // ????nh d???u ph???n t??? pivot
                    array[pivotidx].color = colors.pivot;

                    k = await this.partition(array, i, j, pivot, colors, pivotidx);

                    // h???y ????nh d???u
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