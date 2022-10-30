import { sleep } from './tool';

async function heapify(array, n, i, colors) {
    let largest = i; // khởi tạo root   
    let l = 2 * i + 1; // khởi tạo con trái
    let r = 2 * i + 2; // khởi tạo con phải

    // đánh dấu các phần tử largest, left, right
    array[largest].color = colors.pivot;
    if (l < n) array[l].color = colors.run;
    if (r < n) array[r].color = colors.run;

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

        // tạo hiệu ứng chuyển đổi
        let findspeed = largest - i;
        for (let speed = 0; speed < findspeed * 8; speed ++) {
            array[i].x += 5;
            array[largest].x -= 5;
            await sleep(20);
        }

        // swap
        let temp = array[i].data;
        array[i].data = array[largest].data;
        array[largest].data = temp;

        // trả về vị trí ban đầu của các phần tử
        array[largest].x += 40 * findspeed;
        array[i].x -= 40 * findspeed;

        // tô lại màu
        array[i].color = colors.default;
        array[largest].color = colors.default;
        if (l < n) array[l].color = colors.default;
        if (r < n) array[r].color = colors.default;

        await heapify(array, n, largest, colors);
    }
    
    // tô lại màu
    array[i].color = colors.default;
    array[largest].color = colors.default;
    if (l < n) array[l].color = colors.default;
    if (r < n) array[r].color = colors.default;
}

async function heapsort(array, n, colors) {
    // build heap
    for (let i = parseInt(n / 2 - 1); i >= 0; i--) {
        await heapify(array, n, i, colors);
    }

    for (let i = n - 1; i > 0; i--) {
        // đánh dấu 2 phần tử đầu và cuối
        array[i].color = colors.selected;
        array[0].color = colors.selected;
        await sleep(100);
        // tạo hiệu ứng đổi giữa 2 phần tử đầu và cuối
        for (let speed = 0; speed < i * 8; speed++) {
            array[0].x += 5;
            array[i].x -= 5;
            await sleep(20);
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

        await heapify(array, i, 0, colors);
    }
    array[0].color = colors.sorted;
}

export default async function (length, array, colors) {
    heapsort(array, length, colors);
}