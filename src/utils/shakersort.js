import { sleep } from "./tools";

export default async function(array, colors) {
    let left = 0;
    let right = array.length - 1;
    let k = 0;
    while (left < right) {
        let i;
        for (i = left; i < right; i++) {
            // tô màu đánh dấu
            array[i].color = colors.run;
            array[i + 1].color = colors.run;

            if (array[i].data > array[i + 1].data) {
                // tạo hiệu ứng animation
                for (let speed = 0; speed < 8; speed++) {
                    array[i].x += 5;
                    array[i + 1].x -= 5;
                    await sleep(30);
                }

                let temp = array[i].data;
                array[i].data = array[i + 1].data;
                array[i + 1].data = temp;
                k = i;

                // hoàn vị trí
                array[i].x -= 40;
                array[i + 1].x += 40;
            }
            array[i].color = colors.default;
            array[i + 1].color = colors.default;
        }        
        right = k;
        let j;
        for (j = right; j > left; j--) {
            if (array[j].data < array[j - 1].data) {
                // tô màu đánh dấu
                array[j].color = colors.run;
                array[j - 1].color = colors.run;

                // tạo hiệu ứng animation
                for (let speed = 0; speed < 8; speed++) {
                    array[j].x -= 5;
                    array[j - 1].x += 5;
                    await sleep(30);
                }

                let temp = array[j].data;
                array[j].data = array[j - 1].data;
                array[j - 1].data = temp;
                k = j;

                // hoàn trả vị trí
                array[j].x += 40;
                array[j - 1].x -= 40;
            }
            array[j].color = colors.default;
            array[j - 1].color = colors.default;
        }
        left = k;
    }
}