import { sleep } from './tools';

export default async function(array, colors) {
    let length = array.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = length - 1; j > i; j--) {
            // đánh dấu 2 phần tử được chọn
            array[j].color = colors.run;
            array[j-1].color = colors.run;
            await sleep(100);

            if (array[j].data < array[j-1].data) {

                // tạo hiệu ứng chuyển đổi
                for(let speed = 0; speed < 8; speed++) {
                    array[j].x -= 5;
                    array[j-1].x += 5;
                    await sleep(20);
                }

                // swap
                let temp = array[j].data;
                array[j].data = array[j-1].data;
                array[j-1].data = temp;

                // trả lại đúng vị trí của phần tử
                array[j].x += 40;
                array[j-1].x -= 40;
            }

            // hủy đánh dấu
            array[j].color = colors.default;
        }
        array[i].color = colors.sorted;
    }
    array[length - 1].color = colors.sorted;
}