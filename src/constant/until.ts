import moment from 'moment';

// Convert tiền
export function convertMoney(amount: any): string {
    if (isNaN(amount)) {
        return '--';
    }
    return amount.toLocaleString('vi-VN');
}

// mm/hh - DD/MM/YYYY
export function convertTimeToFormat(input: any): string {
    // Ép kiểu input thành kiểu Date và kiểm tra tính hợp lệ
    const date = new Date(input);

    // Kiểm tra nếu date là một ngày hợp lệ
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date input');
    }

    // Chuyển đổi sang định dạng mong muốn
    return moment(date).format('hh:mm - DD/MM/YYYY');
}