import React from 'react';

const MenuDetailModal: React.FC<any> = ({ order }) => {
  // Kiểm tra nếu không có dữ liệu đơn hàng
  if (!order) {
    return <div>Không có thông tin đơn hàng</div>;
  }

  return (
    <div className="order-details">
      <h2>Chi Tiết Đơn Hàng</h2>
      <p><strong>Mã đơn hàng:</strong> {order.id}</p>
      <p><strong>Ngày đặt:</strong> {new Date(order.date).toLocaleDateString()}</p>
      <p><strong>Trạng thái:</strong> {order.status}</p>

      <h3>Thông tin khách hàng</h3>
      <p><strong>Tên:</strong> {order.customer.name}</p>
      <p><strong>Email:</strong> {order.customer.email}</p>
      <p><strong>Số điện thoại:</strong> {order.customer.phone}</p>

      <h3>Tổng cộng</h3>
      <p><strong>Tổng tiền:</strong> {order.total} VND</p>
    </div>
  );
};

export default MenuDetailModal;
