import { sleep } from '../utils/tools';

export default async function(array, colors) {
    let length = array.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j > 0; j--) {
            if (array[j].data < array[j-1].data) {
                // đánh dấu phần tử
                array[j].color = colors.selected;
                await sleep(100);
                array[j-1].color = colors.run;
                await sleep(100);


                // tạo hiệu ứng transform
                for (let speed = 0; speed < 8; speed++) {
                    array[j].x -= 5;
                    array[j-1].x += 5;
                    await sleep(40);
                }

                // swap
                let temp = array[j].data;
                array[j].data = array[j-1].data;
                array[j-1].data = temp;

                // trả lại vị trí ban đầu
                array[j].x += 40;
                array[j-1].x -= 40;

            }
            // đánh dấu phần tử đã được sắp xếp
            array[j].color = colors.sorted;
            }
        array[0].color = colors.sorted; // gán cứng
    }
}