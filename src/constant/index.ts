export const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  
    // // Xóa cookie token
    // Cookies.remove('token');
  };
  