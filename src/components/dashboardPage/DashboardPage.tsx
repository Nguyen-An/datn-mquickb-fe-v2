"use client"
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DashboardPage = () => {
    const options = {
        chart: {
            type: 'column', // Loại biểu đồ chính là cột
        },
        title: {
            text: 'Doanh Thu và Số Đơn Hàng trong năm 2023',
        },
        xAxis: {
            categories: [
                'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
            ],
            title: {
                text: 'Tháng',
            },
        },
        yAxis: [{
            // Trục Y cho Doanh thu (cột)
            min: 0,
            title: {
                text: 'Doanh thu (VND)',
            },
        }, {
            // Trục Y cho Số đơn hàng (line)
            min: 0,
            title: {
                text: 'Số đơn hàng',
            },
            opposite: true, // Trục Y này nằm ở phía bên phải
        }],
        series: [
            {
                name: 'Doanh thu',
                type: 'column', // Biểu đồ cột
                data: [
                    1200000, 1500000, 1300000, 1700000, 1600000, 1900000,
                    2100000, 2200000, 2000000, 2400000, 2500000, 2700000
                ], // Dữ liệu doanh thu
            },
            {
                name: 'Số đơn hàng',
                type: 'line', // Biểu đồ line
                data: [
                    100, 120, 110, 130, 125, 140,
                    160, 150, 145, 170, 180, 200
                ], // Dữ liệu số đơn hàng cho mỗi tháng
                yAxis: 1, // Chỉ định sử dụng trục Y thứ hai cho số đơn hàng
                marker: {
                    enabled: true, // Hiển thị điểm dữ liệu trên line
                },
            }
        ],
    };

    return (
        <>
            <div className='w-full flex justify-center'>
                <div className='w-[calc(100%-100px)] mt-10'>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
