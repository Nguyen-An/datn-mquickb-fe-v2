import { jwtDecode } from "jwt-decode";
// export const handleLogout = () => {
//     // Xóa token khỏi localStorage
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     // // Xóa cookie token
//     // Cookies.remove('token');
//   };

export const decodeToken = (token: any): string => {
  try {
    const decoded = jwtDecode(token);
    return JSON.stringify(decoded);;
  } catch (error) {
    console.error('Error decoding token:', error);
    return '';
  }
};

export const handleSaveUserInfo = (data: string = '') => {
  localStorage.setItem('token', data);
  localStorage.setItem('user', decodeToken(data));
}

export const handleLogout = () => {
  // Xóa token khỏi localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
