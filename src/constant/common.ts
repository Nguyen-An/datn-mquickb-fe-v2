export const COMMON = {
    USER_ROLES: [
        {
            value: "customer",
            label: "Khác hàng"
        },
        {
            value: "customer_qr",
            label: "Khác hàng QR"
        },
        {
            value: "staff",
            label: "Nhân viên"
        },
        {
            value: "manager",
            label: "Quản lý"
        },
    ],
    TABLE_STATUS: [
        {
            value: "available",
            label: "Đang trống"
        },
        {
            value: "booked",
            label: "Đã đặt"
        },
        {
            value: "in_use",
            label: "Đang sử dụng"
        }
    ],
    ROLE: [
        {
            value: "staff",
            label: "Nhân viên"
        },
        {
            value: "manager",
            label: "Quản lý"
        },
    ],
    ORDER_STATUS: [
        { value: 'pending', label: 'Chờ xử lý ' },
        { value: 'order_received', label: 'Đã nhận đơn' },
        { value: 'cooking', label: 'Đang nấu' },
        { value: 'served', label: 'Đã phục vụ' },
        { value: 'rejected', label: 'Đã từ chối' },
        { value: 'paid', label: 'Đã thanh toán' },
    ],
    STAFF_CALLS: [
        { value: 'pending', label: 'Đang chờ' },
        { value: 'in_progress', label: 'Đang trong xử lý' },
        { value: 'completed', label: 'Hoàn thành' },
    ],
}

export const getLabelByValue = (ARR: any, value: any) => {
    const status = ARR.find((item: any) => item.value === value);
    return status ? status.label : null; // Trả về label nếu tìm thấy, nếu không trả về null
};