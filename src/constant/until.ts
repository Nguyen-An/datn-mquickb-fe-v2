// Number

// Convert tiền
export function convertMoney(amount: any): string {
    if (isNaN(amount)) {
        return '--';
    }
    return amount.toLocaleString('vi-VN');
}