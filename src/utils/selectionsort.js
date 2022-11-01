import { sleep } from '../utils/tool';

export default async function(array, colors) {
    let lowkey;
    let lowkeyindex;
    let length = array.length;
    
    for (let i = 0; i < length - 1; i++) {
        lowkey = array[i].data;
        lowkeyindex = i;
        
        // đánh dấu phần tử lowkey đầu tiên
        array[i].color = colors.selected;
    
        for (let j = i + 1; j < length; j++) {
            // tạo hiệu ứng duyệt qua phần tử
            array[j].color = colors.run;
            await sleep(100);
            array[j].color = colors.default;
    
            if (array[j].data < lowkey) {
    
                // gán lại màu cho phần tử lowkey đã chọn trước đó
                array[lowkeyindex].color = colors.default;
                await sleep(100);
    
                // gán lại lowkey và lowkeyindex
                lowkey = array[j].data;
                lowkeyindex = j;
    
                // đánh dấu phần tử lowkey tiếp theo
                array[lowkeyindex].color = colors.selected;
                await sleep(100);
            }
        }
    
        // tạo hiệu ứng chuyển đổi
        array[i].color = colors.selected;
        // tính khoảng cách giữa lowkey mới và lowkey củ
        let findspeed = (array[lowkeyindex].x - array[i].x) / 40;
        
        for (let speed = 0; speed < findspeed * 8; speed++ ) {
            array[lowkeyindex].x -= 5;
            array[i].x += 5;
            await sleep(20);
        }
    
        // swap
        let temp = array[lowkeyindex].data;
        array[lowkeyindex].data = array[i].data;
        array[i].data = temp;
    
        // khôi phục transform cho các phần tử
        array[lowkeyindex].x += 40 * findspeed;
        array[i].x -= 40 * findspeed;
    
        // tô lại màu
        array[lowkeyindex].color = colors.default;
        array[i].color = colors.sorted;
    }
    array[length - 1].color = colors.sorted;
}

