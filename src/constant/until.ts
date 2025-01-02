import moment from 'moment';

// Convert tiền
export function convertMoney(amount: any): string {
    if (isNaN(amount)) {
        return '--';
    }
    return amount.toLocaleString('vi-VN');
}

// mm/hh - DD/MM/YYYY
export function convertTimeToFormat(input: string | number | Date): string {
    // Chuyển đổi input sang kiểu Date
    const date = new Date(input);

    // Kiểm tra nếu input là một ngày hợp lệ
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date input');
    }

    // Điều chỉnh múi giờ (cộng thêm 7 tiếng)
    const adjustedDate = moment(date).add(7, 'hours');

    // Trả về ngày theo định dạng mong muốn
    return adjustedDate.format('HH:mm - DD/MM/YYYY');
}

// DD/MM/YYYY
export function convertTimeToFormat2(input: any): string {
    // Chuyển đổi input sang kiểu Date
    const date = new Date(input);

    // Kiểm tra nếu input là một ngày hợp lệ
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date input');
    }

    // Điều chỉnh múi giờ (cộng thêm 7 tiếng)
    const adjustedDate = moment(date).add(7, 'hours');

    // Trả về ngày theo định dạng mong muốn
    return adjustedDate.format('DD/MM/YYYY');
}

export function formatTimeDifference(time: any): string {
    const createAt = new Date(time);

    // Cộng thêm 7 giờ vào thời gian 'createAt'
    createAt.setHours(createAt.getHours() + 7);

    const currentTime = new Date();
    const diffInSeconds = Math.floor((currentTime.getTime() - createAt.getTime()) / 1000); // tính chênh lệch thời gian tính theo giây

    // Nếu chênh lệch dưới 60 giây
    if (diffInSeconds < 60) {
        return `${diffInSeconds} giây trước`;
    }
    // Nếu chênh lệch từ 1 phút đến dưới 1 giờ
    else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60); // tính chênh lệch thời gian tính theo phút
        return `${diffInMinutes} phút trước`;
    }
    // Nếu chênh lệch từ 1 giờ trở lên
    else if (diffInSeconds < 86400) { // 86400 giây = 24 giờ
        const diffInHours = Math.floor(diffInSeconds / 3600); // tính chênh lệch thời gian tính theo giờ
        return `${diffInHours} giờ trước`;
    }
    // Nếu chênh lệch lớn hơn 24 giờ
    else {
        const diffInDays = Math.floor(diffInSeconds / 86400); // tính chênh lệch thời gian tính theo ngày
        return `${diffInDays} ngày trước`;
    }
}