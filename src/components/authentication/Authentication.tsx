/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { notification, Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import "../authentication/auth.scss"
import { instance } from '@/api/hook'
import { handleLogout } from '@/constant'

const Authentication = () => {
    const router = useRouter();
    const [isHandling403, setIsHandling403] = useState<boolean>(false);
    const [apis, setApis] = useState<number>(0);

    useEffect(() => {
        instance.interceptors.request.use(
            function (config) {
                setApis((value) => ++value)
                const accessToken = localStorage.getItem('token');
                const urlsNoAuth = ['/auth']
                if (config.url && !urlsNoAuth.includes(config.url)) config.headers.Authorization = `Bearer ${accessToken ? accessToken : ''}` as string
                return config
            },

            function (error) {
                return Promise.reject(error)
            }
        )

        instance.interceptors.response.use(
            function (response) {
                setApis((value) => --value)
                return response
            },
            function (error) {
                setApis((value) => --value)

                // check network error
                if (!error.response) {
                    notification["error"]({
                        message: "internal_server_error",
                    });
                    return;
                }
                if (error.response && [403].includes(error.response.status)) {
                    setIsHandling403(true);
                    router.push("/");
                    handleLogout();
                }
                return Promise.reject(error)
            })
    }, [])

    useEffect(() => {
        if (isHandling403 && apis < 1) {
            notification["error"]({
                message: 'session_has_expired',
            });
            setIsHandling403(false);
        }
    }, [apis, isHandling403]);

    return (
        <Spin spinning={apis > 0} size='large' fullscreen />
    )

}
export default Authentication
