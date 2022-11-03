import { sleep } from './tools';

// Gọp 2 mảng con arr[l...m] và arr[m+1...r]
async function merge(array, l, m, r, colors) {
    let i;
    let j;
    let k;

    let n1 = m - l + 1;
    let n2 = r - m;

    // tạo các mảng tạm để lưu các phần tử
    let L = [];
    let R = [];

    // copy dữ liệu sang mảng tạm
    for (i = 0; i < n1; i++) {
        L[i] = array[l + i].data;

        // tạo hiệu ứng chia mảng bên trái
        array[l + i].color = colors.left;

        // tạo hiệu ứng thêm mảng con trái vào arr
        for(let speed = 0; speed < 10; speed++) {
            array[l + i].y += 30;
            await sleep(40);
        }
    }

    for (j = 0; j < n2; j++) {
        R[j] = array[m + 1 + j].data;

        // tạo hiệu ứng chia mảng bên phải
        array[m + 1 + j].color = colors.right;

        // tạo hiệu ứng thêm mảng con phải vào arr
        for(let speed = 0; speed < 10; speed++) {
            array[m + 1 + j].y += 30;
            await sleep(40);
        }
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
                await sleep(40);
            }

            // hiển thị arr và đánh dấu
            array[k].color = colors.sorted;
        } else {
            array[k].data = R[j];
            j++;

            // tạo hiệu ứng thêm từ mảng R[i] vào arr[k]
            for(let speed = 0; speed < 10; speed++) {
                array[k].y -= 30;
                await sleep(40);
            }
            // hiển thị arr và đánh dấu
            array[k].color = colors.sorted;            
        }
        k++;
        await sleep(100);
    }

    // copy các phần tử còn lại của mảng L vào arr nếu có
    while (i < n1) {
        array[k].data = L[i];

        // tạo hiệu ứng thêm từ mảng L[i] vào arr[k]
        for(let speed = 0; speed < 10; speed++) {
            array[k].y -= 30;
            await sleep(40);
        }
        // hiển thị arr và đánh dấu
        array[k].color = colors.sorted;
        
        i++;
        k++;
    }

    // copy các phần tử còn lại của mảng R vào arr nếu có
    while (j < n2) {
        array[k].data = R[j];

        // tạo hiệu ứng thêm từ mảng R[i] vào arr[k]
        for(let speed = 0; speed < 10; speed++) {
            array[k].y -= 30;
            await sleep(40);
        }
        // hiển thị arr và đánh dấu
        array[k].color = colors.sorted;

        j++;
        k++;
    }
}

// l là chỉ số trái, r là chỉ số phải
async function mergesort(array, l, r, colors) {
    if (l < r) {
        // tránh tràn số khi l và r lớn
        let m = parseInt(l + (r - l) / 2);

        // gọi hàm đệ quy tiếp tục chia đôi từng mảng
        await mergesort(array, l, m, colors);
        await mergesort(array, m + 1, r, colors);

        await merge(array, l, m, r, colors);
    }
}

export default async function (length, array, colors) {
    await mergesort(array, 0, length - 1, colors);
}