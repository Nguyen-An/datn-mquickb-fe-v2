export const COMMON = {
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
            value: "customer",
            label: "Khách hàng"
        },
        {
            value: "customer_qr",
            label: "Khác đăng nhập qr"
        },
        {
            value: "staff",
            label: "Nhân viên"
        },
        {
            value: "manager",
            label: "Quản lý"
        },
    ]
}

export const getLabelByValue = (ARR: any, value: any) => {
    const status = ARR.find((item: any) => item.value === value);
    return status ? status.label : null; // Trả về label nếu tìm thấy, nếu không trả về null
  };