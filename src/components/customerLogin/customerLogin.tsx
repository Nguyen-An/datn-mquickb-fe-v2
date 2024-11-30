"use client"
import { Tabs, TabsProps } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CustomerLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // if (!username || !password) {
        //     setError('Vui lòng nhập đầy đủ thông tin');
        //     console.log(123123);

        // } else {
        //     setError('');
        //     // Tiến hành xử lý đăng nhập, ví dụ: gửi request tới API
        //     console.log('Đăng nhập với', { username, password });
        // }
        router.push('/customer/list-menu')
    };

    const onChange = (key: string) => {
        console.log(key);
    };



    const FromLoginQR = (
        <form className="space-y-4">
            <div className="space-y-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-600">Tên của bạn</label>
                <input type="text" id="username" name="username" placeholder="Nhập tên của bạn" value={username} onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>

            <div className="space-y-1">
                <label htmlFor="qrcode" className="block text-sm font-medium text-gray-600">Mã QR</label>
                <input type="qrcode" id="qrcode" name="qrcode" placeholder="Mã QR" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <p className="text-sm text-red-600 text-center">{error}</p>
            <button type="submit" onClick={(e) => handleSubmit(e)} className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none">
                Đăng nhập
            </button>
        </form>
    )

    const FromLoginCustomer = (
        <form className="space-y-4">
            <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <input type="text" id="email" name="email" placeholder="Nhập email" value={username} onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>

            <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mật khẩu</label>
                <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <p className="text-sm text-red-600 text-center">{error}</p>
            <button type="submit" onClick={(e) => handleSubmit(e)} className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none">
                Đăng nhập
            </button>
        </form>
    )

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Đăng nhập bằng QR',
            children: FromLoginQR,
        },
        {
            key: '2',
            label: 'Đăng nhập bằng tài khoản',
            children: FromLoginCustomer,
        }
    ];
    return (
        <div className="flex items-center justify-center h-screen bg-gray-300">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700">Đăng nhập</h2>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
        </div>
    );
};

export default CustomerLogin;