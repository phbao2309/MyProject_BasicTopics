<script>
    // import swalert
    import { swalert, swtoast } from "@/mixins/swal.mixin";
    // import tool
    import { shuffed, sleep } from './utils/tools.js';
    // import component
    import BubbleSort from './components/BubbleSort.vue';
    import ShakerSort from './components/ShakerSort.vue';
    import QuickSort from './components/QuickSort.vue';
    import MergeSort from './components/MergeSort.vue';
    import HeapSort from './components/HeapSort.vue';
    import SelectionSort from './components/SelectionSort.vue';
    import InsertionSort from './components/InsertionSort.vue';
    // import view : dùng để hiển thị thuật toán
    import ViewAlgorithms from './components/ViewAlgorithms.vue';
    export default {
        components: { 
            BubbleSort,
            ShakerSort,
            QuickSort,
            MergeSort,
            HeapSort,
            SelectionSort,
            InsertionSort,
            ViewAlgorithms,
        },
        data() {
            return {
                array: [], // một mảng gồm các opject {data, x, y, selected, sorted}
                arrayInput: '10, 14, 8, 9, 20',
                arraySave: [], // dùng để lưu trữ mảng hiện tại
                length:  Math.floor(Math.random() * 5) + 10,
                statusChoiceAlogirthm: 'bubble', // trạng thái chọn thuật toán, mặc định là bubble sort
                isSorted: false, // đánh dấu mảng chưa được sắp xếp
                isSorting: false, // đánh dấu mảng đang sắp xếp 
                // bảng màu dành cho việc đánh dấu
                colors: {
                    default: 'rgb(173, 216, 230)',
                    run: 'rgb(0, 128, 0)',
                    sorted: 'rgb(255, 165, 0)',
                    selected: 'rgb(220, 20, 60)',
                    pivot: 'rgb(153, 50, 204)',
                    left: 'rgb(255, 255, 0)',
                    right: 'rgb(220, 20, 60)',
                },
                width: window.orientation,
                count: 0, // sử dụng để đếm số lần random mà hiển thị thông báo cho phù hợp
            }
        },
        methods: {
            // random nhận vào title là tên của thuật toán
            async random(title, notification) {
                this.statusChoiceAlogirthm = title;
                this.count++;
                
                // kiểm tra mảng đã được tạo hay chưa nếu có thì xóa và tạo mới
                if (this.array !== []) {
                    this.array = [];
                }

                await sleep(100);

                this.isSorting = false; // đánh dấu thuật toán chưa được kích hoạt
                this.isSorted = false; // đánh dáu lại mảng chưa được sắp xếp

                if (this.length <= 15 && this.length >= 5) {
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

                    if (this.count > 1 && notification === 1) {
                        swtoast.success({
                            text: "Create array successfully"
                        });
                    }

                } else {
                    swalert
                        .fire({
                            title: "Input of incorrect",
                            icon: "warning",
                            text: "Input allowable from 5 to 15",
                        });
                }
            },
            create() {
                if (this.arrayInput === '') {
                    // alert("Dữ liệu đầu vào không đúng");
                    swalert
                        .fire({
                            title: "Input of incorrect",
                            icon: "warning",
                            text: "Input is empty",
                        });
                } else {
                    this.isSorting = false; // đánh dấu thuật toán chưa được kích hoạt
                    this.isSorted = false; // đánh dáu lại mảng chưa được sắp xếp
                    // kiểm tra array gốc xem nó có phần tử hay chưa, nếu có thì xóa
                    if (this.array !== []) {
                        this.array = [];
                    }

                    if (
                        this.arrayInput.split(/[,:]/).length >= 5 &&
                        this.arrayInput.split(/[,:]/).length <= 15 
                    ) {
                        let count = 0;
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
                                count ++; // dùng để đếm các phần tử không hợp lệ
                                swalert
                                    .fire({
                                        title: "Input of incorrect",
                                        icon: "warning",
                                        text: "The maximum data limit per element is 20 and is separated by ',' or ';'",
                                    });
                            }
                        }
                        
                        if (count != 0) {
                            this.array = [];
                        }

                        // thêm x, y để tạo hiệu ứng transform
                        if (this.array.length !== 0) {
                            let x = 0;
                            for (let i = 0; i < this.array.length; i++) {
                                x += 40;
                                this.array[i].x = x;
                                this.array[i].y = 0;
                            }
                            swtoast.success({
                                text: "Create array successfully"
                            });
                        }
                    } else {
                        swalert
                            .fire({
                                title: "Input of incorrect",
                                icon: "warning",
                                text: "Input allowable from 5 to 15",
                            });
                    }
                }
            },
            async start() {
                if (this.array.length === 0) {
                    swalert
                        .fire({
                            title: "Error",
                            icon: "warning",
                            text: "Haven't created array yet",
                        });
                } else if (this.isSorted) {

                    this.random(this.statusChoiceAlogirthm, 1);

                } else if (!this.isSorted && !this.isSorting) {
                    this.isSorting = true; // đánh dấu mảng đang được sắp xếp
                    try {
                        await this.$refs[this.statusChoiceAlogirthm].start();
                        this.isSorted = true; // đánh dấu mảng đã được sắp xếp
                        this.isSorting = false; // đánh dấu thuật toán đã dừng
                    } catch (error) {
                        // khi xóa mảng một cách đột ngột set lại các thuộc tính Sorted và Sorting
                        // console.log(error);
                        this.isSorting = false; // đánh dấu thuật toán chưa được kích hoạt
                        this.isSorted = false; // đánh dáu lại mảng chưa được sắp xếp
                    }
                }
            },
            clear() {
                this.isSorting = false; // đánh dấu thuật toán chưa được kích hoạt
                this.isSorted = false; // đánh dáu lại mảng chưa được sắp xếp
                this.array = [];
            },
            // Hiển thị thông báo khi sử dụng trên mobile với kích thước hiển thị không phù hợp
            notificationWhenScreenMobile() {
                if (this.width === 0) {
                    swalert
                        .fire({
                            title: "Recommendation",
                            icon: "warning",
                            text: "Please rotate the screen horizontally for a better experience",
                        });
                }
            }
        },
        created() {
            this.notificationWhenScreenMobile();
            this.random(this.statusChoiceAlogirthm);
        }
    }
</script>

<template>
    <div class="navigation nav">
        <span class="title">
            <p 
                class="title-item" 
                :class="{'title-item-choice': statusChoiceAlogirthm === 'bubble'}"
                @click="random('bubble')"
            >Bubble sort</p>
            <p 
                class="title-item"
                :class="{'title-item-choice': statusChoiceAlogirthm === 'shaker'}"
                @click="random('shaker')"
            >Shaker sort</p>
            <p 
                class="title-item"
                :class="{'title-item-choice': statusChoiceAlogirthm === 'quick'}"
                @click="random('quick')"
            >Quick sort</p>
            <p 
                class="title-item"
                :class="{'title-item-choice': statusChoiceAlogirthm === 'merge'}"
                @click="random('merge')"
            >Merge sort</p>
            <p 
                class="title-item"
                :class="{'title-item-choice': statusChoiceAlogirthm === 'heap'}"
                @click="random('heap')"
            >Heap sort</p>
            <p 
                class="title-item" 
                :class="{'title-item-choice': statusChoiceAlogirthm === 'selection'}"
                @click="random('selection')"
            >Selection sort</p>
            <p 
                class="title-item" 
                :class="{'title-item-choice': statusChoiceAlogirthm === 'insertion'}"
                @click="random('insertion')"
            >Insertion sort</p>
        </span>

        <div class="navigation-item">
            <button 
                class="btn btn-secondary btn-sm"
                type="button" data-bs-toggle="offcanvas" 
                data-bs-target="#offcanvasWithBothOptions" 
                aria-controls="offcanvasWithBothOptions"
            >Custom</button>

            <button 
                class="btn-right btn btn-secondary btn-sm" type="button" 
                style="margin-left: 5px; width: 65.5px;"
                @click="random(statusChoiceAlogirthm, 1)"
            >Random</button>

            <button 
                class="btn btn-secondary btn-sm" type="button" 
                style="margin-left: 5px; width: 65.5px;"
                @click="start()"
            >Start</button>

            <button 
                class="btn-right btn btn-secondary btn-sm" type="button" 
                style="margin-left: 5px; width: 65.5px;"
                @click="clear()"
            >Clear</button>
        </div>

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
                    @click="random(statusChoiceAlogirthm, 1)"
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
        <div class="main-item">
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
        <view-algorithms class="view-item" :statusChoiceAlogirthm="statusChoiceAlogirthm"/>
    </div>
    
    
</template>

<style scoped>
    * {
        margin: 0px;
        padding: 0px;
    }

    .main{
        display: flex;
    }

    .main-item {
        width: 60%;
    }

    .navigation {
        width: 100%;
        display: flex;
        align-items: center;
        min-height: 50px;
        background-color: black;
    }
    .title {
        width: 60%;
        margin-right: 10px;
        padding-right: 10px;
        color: #aaa;
        font-size: 16px;
        text-transform: uppercase;
        text-align: center;
    }

    .title-item {
        /* width: 85px; */
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

    @media only screen and (max-width: 1200px) {
        .navigation {
            display: flex;
            justify-content: flex-start;
            padding-left: 0px;
        }

        .title {
            margin-right: 0px;
            /* font-size: 12px; */
        }

        .title-item {
            margin: 0px 10px;
        }

        .main-item {
            width: 100%;
            margin-left: 0px;
            padding-left: 0px;
        }

        .navigation-item {
            margin-top: 5px;
            margin-bottom: 7px;
            width: 100%;
            display: flex;
            padding-left: 10px;
        }

        @media (orientation: portrait) {
            .main {
                display: none;
            }
        }

        @media (orientation: landscape) {
            .main {
                display: block;
            }

            .title {
                width: 100%;
                display: flex;
            }

            .view-item {
                padding: 0px;
                display: none;
            }
        }
    }
</style>