<script>
    // import tool
    import { shuffed } from './utils/tool.js';
    // import component
    import BubbleSort from './components/BubbleSort.vue';
    import ShakerSort from './components/ShakerSort.vue';
    import QuickSort from './components/QuickSort.vue';
    import MergeSort from './components/MergeSort.vue';
    import HeapSort from './components/HeapSort.vue';
    import SelectionSort from './components/SelectionSort.vue';
    import InsertionSort from './components/InsertionSort.vue';
    export default {
        components: { 
            BubbleSort,
            ShakerSort,
            QuickSort,
            MergeSort,
            HeapSort,
            SelectionSort,
            InsertionSort,
        },
        data() {
            return {
                array: [], // một mảng gồm các opject {data, x, y, selected, sorted}
                arrayInput: '10, 14, 8, 9, 20',
                length: Math.floor(Math.random() * 15) + 7,
                statusChoiceAlogirthm: 'quick', // trạng thái chọn thuật toán, mặc định là bubble sort
                isSorted: false, // đánh dấu mảng chưa được sắp xếp
                // bảng màu dành cho việc đánh dấu
                colors: {
                    default: 'rgb(173, 216, 230)',
                    run: 'rgb(0, 128, 0)',
                    sorted: 'rgb(255, 165, 0)',
                    selected: 'rgb(220, 20, 60)',
                    pivot: 'rgb(153, 50, 204)',
                }
            }
        },
        methods: {
            random() {
                this.isSorted = false; // đánh dấu mảng chưa được sắp xếp
                // kiểm tra mảng đã được tạo hay chưa nếu có thì xóa và tạo mới
                if (this.array !== []) {
                    this.array = [];
                }

                if (this.length <= 20) {
                    // mảng chứa các phần tử từ 1 đến lenght
                    for (let i = 0; i < this.length; i++) {
                        this.array.push({
                            data: Math.floor(Math.random() * 20) + 1,
                            color: 'rgb(173, 216, 230)',
                        });
                    }

                    // trộn ngẫu nhiên các phần tử trong mảng
                    this.array = shuffed(shuffed(shuffed(this.array)));

                    // thêm x, y để tạo hiệu ứng transform
                    let x = 0;
                    for (let i = 0; i < this.length; i++) {
                        x += 40;
                        this.array[i].x = x;
                        this.array[i].y = 0;
                    }
                }
            },
            create() {
                this.isSorted = false; // đánh dấu mảng chưa được sắp xếp
                if (this.arrayInput === '') {
                    alert("Empty!!!");
                } else {
                    // kiểm tra array gốc xem nó có phần tử hay chưa, nếu có thì xóa
                    if (this.array !== []) {
                        this.array = [];
                    }

                    // tách và kiểm tra chuỗi
                    for (let i = 0; i < this.arrayInput.split(/[,:]/).length; i++) {
                        // kiểm tra xem phần tử có phải là số hay không
                        if (
                            parseInt(this.arrayInput.split(/[,;]/)[i]) &&
                            parseInt(this.arrayInput.split(/[,;]/)[i]) > 0 &&
                            parseInt(this.arrayInput.split(/[,;]/)[i]) <= 20
                        ) {
                            let number = parseInt(this.arrayInput.split(/[,;]/)[i]);
                            this.array.push({
                                data: number,
                                color: this.colors.default,
                            })
                        } else {
                            alert("Dữ liệu đầu vào không đúng");
                        }
                    }

                    // thêm x, y để tạo hiệu ứng transform
                    let x = 0;
                    for (let i = 0; i < this.array.length; i++) {
                        x += 40;
                        this.array[i].x = x;
                        this.array[i].y = 0;
                    }
                }
            },
            start() {
                if (this.isSorted) {
                    alert("Mảng đã được sắp xếp");
                } else {
                    this.$refs[this.statusChoiceAlogirthm].start();
                    this.isSorted = true;
                }
            },
            clear() {
                this.isSorted = false; // đánh dáu lại mảng chưa được sắp xếp
                this.array = [];
            }
        },
        created() {
            this.random();
        }
    }
</script>

<template>
    <div class="navigation">
        <span class="title">
            <p 
                class="title-item" 
                :class="{'title-item-choice': statusChoiceAlogirthm === 'bubble'}"
                @click="statusChoiceAlogirthm = 'bubble'"
            >Bubble sort</p>
            <p 
                class="title-item"
                :class="{'title-item-choice': statusChoiceAlogirthm === 'shaker'}"
                @click="statusChoiceAlogirthm = 'shaker'"
            >Shaker sort</p>
            <p 
                class="title-item"
                :class="{'title-item-choice': statusChoiceAlogirthm === 'quick'}"
                @click="statusChoiceAlogirthm = 'quick'"
            >Quick sort</p>
            <p 
                class="title-item"
                :class="{'title-item-choice': statusChoiceAlogirthm === 'merge'}"
                @click="statusChoiceAlogirthm = 'merge'"
            >Merge sort</p>
            <p 
                class="title-item"
                :class="{'title-item-choice': statusChoiceAlogirthm === 'heap'}"
                @click="statusChoiceAlogirthm = 'heap'"
            >Heap sort</p>
            <p 
                class="title-item" 
                :class="{'title-item-choice': statusChoiceAlogirthm === 'selection'}"
                @click="statusChoiceAlogirthm = 'selection'"
            >Selection sort</p>
            <p 
                class="title-item" 
                :class="{'title-item-choice': statusChoiceAlogirthm === 'insertion'}"
                @click="statusChoiceAlogirthm = 'insertion'"
            >Insertion sort</p>
        </span>

        <button 
            class="btn btn-secondary btn-sm"
            type="button" data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasWithBothOptions" 
            aria-controls="offcanvasWithBothOptions"
        >Custom</button>

        <button 
            class="btn btn-secondary btn-sm" type="button" 
            style="margin-left: 5px; width: 65.5px;"
            @click="start()"
        >Start</button>

        <button 
            class="btn btn-secondary btn-sm" type="button" 
            style="margin-left: 5px; width: 65.5px;"
            @click="clear()"
        >Clear</button>

        <div 
            class="offcanvas offcanvas-start" 
            data-bs-scroll="true" tabindex="-1" 
            id="offcanvasWithBothOptions" 
            aria-labelledby="offcanvasWithBothOptionsLabel"
        >
            <div class="offcanvas-header">
                <h5 
                    class="offcanvas-title" 
                    id="offcanvasWithBothOptionsLabel"
                >Custom</h5>
                <button 
                    type="button" 
                    class="btn-close" 
                    data-bs-dismiss="offcanvas" 
                    aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body">
                <!-- Nhập độ dài để tạo mảng -->
                <div class="input-group mb-3">
                    <input 
                        type="number" class="form-control"
                        placeholder="Enter the number of elements"
                        aria-label="Username"                    
                        v-model="length"
                    >
                </div>
                <button
                    style="width: 100px;"
                    type="button" class="btn btn-secondary btn-sm"
                    @click="random()"
                >
                    Random
                </button>

                <!-- Nhập các phần tử tùy ý và tạo mảng -->
                <div class="input-group" style="margin-top: 15px">
                    <textarea 
                        class="form-control" 
                        aria-label="With textarea"
                        placeholder="Enter the elements"
                        v-model="arrayInput"
                    ></textarea>
                </div>
                <button 
                    style="margin-top: 15px; width: 100px;"
                    type="button" class="btn btn-secondary btn-sm"
                    @click="create()"
                >
                    Create
                </button>
            </div>
        </div>
    </div>
    
    <div class="main">
        <bubble-sort 
            :array="array" :colors="colors" 
            v-if="statusChoiceAlogirthm === 'bubble'" 
            ref="bubble"
        />
        <shaker-sort 
            :array="array" :colors="colors"
            v-if="statusChoiceAlogirthm === 'shaker'" 
            ref="shaker"
        />
        <quick-sort 
            :array="array" :colors="colors"
            v-if="statusChoiceAlogirthm === 'quick'"
            ref="quick"
        />
        <merge-sort 
            :array="array" :colors="colors"
            v-if="statusChoiceAlogirthm === 'merge'" 
            ref="merge"
        />
        <heap-sort 
            :array="array" :colors="colors" 
            v-if="statusChoiceAlogirthm === 'heap'" 
            ref="heap"
        />
        <selection-sort 
            :array="array" :colors="colors" 
            v-if="statusChoiceAlogirthm === 'selection'" 
            ref="selection"
        />
        <insertion-sort 
            :array="array" :colors="colors" 
            v-if="statusChoiceAlogirthm === 'insertion'" 
            ref="insertion"
        />
    </div>
</template>

<style scoped>
    * {
        margin: 0px;
        padding: 0px;
    }

    .main {
        padding-left: 20px;
    }

    .navigation {
        padding-left: 50px;
        display: flex;
        align-items: center;
        height: 50px;
        background-color: black;
    }
    .title {
        margin-right: 20px;
        color: #aaa;
        font-size: 16px;
        text-transform: uppercase;
        text-align: center;
    }

    .title-item {
        display: inline;
        margin: 10px;
        cursor: pointer;
    }

    .title-item-choice {
        font-weight: 700;
        color: white;
    }

    .title-item:hover {
        color: white;
    }
</style>