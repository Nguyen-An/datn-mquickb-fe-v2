"use client"
import { getDataDashboardOrder, getDataDashboardRevenue } from '@/api/order';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import { converDataOrderDashboard, converDataRevenueDashboard } from './const';

const DashboardPage = () => {
    const [totalOrders, setTotalOrders] = useState([
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0
    ]);

    const [totalRevenue, setTotalRevenue] = useState([
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
    ]);

    const getDataDashboard = async () => {
        try {
            const dataOrders = await getDataDashboardOrder({})
            const dataRevenue = await getDataDashboardRevenue({})
            setTotalOrders(converDataOrderDashboard(dataOrders?.data))
            setTotalRevenue(converDataRevenueDashboard(dataRevenue?.data))
        } catch (error) {
        }
    }

    useEffect(() => {
        getDataDashboard()
    }, [])

    const options = {
        chart: {
            type: 'column', // Loại biểu đồ chính là cột
        },
        title: {
            text: 'Doanh Thu và Số Đơn Hàng trong năm 2024',
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
                data: totalRevenue, // Dữ liệu doanh thu
            },
            {
                name: 'Số đơn hàng',
                type: 'line', // Biểu đồ line
                data: totalOrders, // Dữ liệu số đơn hàng cho mỗi tháng
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
