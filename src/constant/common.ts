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
    ]
}

export const getLabelByValue = (ARR: any, value: any) => {
    const status = ARR.find((item: any) => item.value === value);
    return status ? status.label : null; // Trả về label nếu tìm thấy, nếu không trả về null
  };