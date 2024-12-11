import React, { useState } from 'react';
import { Modal, Form, Input, Button, notification, Tabs, TabsProps, FormProps } from 'antd';
import Image from 'next/image';
import icon from '@/../public/icons/index';
import { useRouter } from 'next/navigation';
import { signin } from '@/api/user';
import { handleSaveUserInfo } from '@/constant';

// Định nghĩa interface cho props
// 'client' | 'user'
interface UserFormProps {
    isopen: boolean;
    typeLogin: string;
    onCancel: () => void;
}

type FieldTypeUser = {
    username?: string;
    password?: string;
};

type FieldTypeClient = {
    clientname?: string;
};

const ModalLogin = ({
    isopen,
    typeLogin,
    onCancel
}: UserFormProps) => {
    const srcIconlogo = icon['iconlogo']

    const router = useRouter()
    const handleOk = () => {

    };

    const onChange = (key: string) => {
        console.log(key);
    };

    const onFinishLoginUser: FormProps<FieldTypeUser>['onFinish'] = async (values) => {
        let user = {
            "email": values?.username,
            "password": values?.password
        }

        try {
            const data = await signin(user)
            handleSaveUserInfo(data?.data)
            notification.open({
                message: 'Đăng nhập thành công!',
                type: 'success'
            });
            router.push('/chat')
        } catch (error) {
            notification.open({
                message: 'Tài khoản hoặc mật khẩu không chính xác, vui lòng đăng nhập lại!',
                type: 'error'
            });
        }
    };

    const onFinishLoginClient: FormProps<FieldTypeClient>['onFinish'] = (values) => {
        // router.push('/chat')
        // notification.open({
        //     message: 'Đăng nhập thành công!',
        //     type: 'success'
        // });

        console.log(values);

    };

    const loginFrom = (type: string) => {
        if (type === 'user') {
            return <Form
                layout={'vertical'}
                name="userForm"
                initialValues={{ remember: true }}
                onFinish={onFinishLoginUser}
                autoComplete="off"
            >
                <Form.Item<FieldTypeUser>
                    label="Tên đăng nhập"
                    name="username"
                    rules={[{ required: true, message: 'Tên đăng nhập không được để trống!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldTypeUser>
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <div className='flex justify-center'>
                        <Button type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        } else if (type === 'client') {
            return (<div>Tính năng đang được phát triển!</div>)
            // return <Form
            //     layout={'vertical'}
            //     name="clientForm"
            //     initialValues={{ remember: true }}
            //     onFinish={onFinishLoginClient}
            //     autoComplete="off"
            // >
            //     <Form.Item<FieldTypeClient>
            //         label="Tên đăng nhập"
            //         name="clientname"
            //         rules={[{ required: true, message: 'Tên đăng nhập không được để trống' }]}
            //     >
            //         <Input />
            //     </Form.Item>

            //     <Form.Item label={null}>
            //         <div className='flex justify-center'>
            //             <Button type="primary" htmlType="submit">
            //                 Đăng nhập
            //             </Button>
            //         </div>
            //     </Form.Item>
            // </Form>
        }
    }

    const items: TabsProps['items'] = [
        {
            key: 'client',
            label: 'Đăng nhập với tư khách khách',
            children: loginFrom('client'),
        },
        {
            key: 'user',
            label: 'Đăng nhập với account',
            children: loginFrom('user'),
        }
    ];


    return (
        <>
            <Modal centered open={isopen} onOk={handleOk} footer={null} onCancel={() => onCancel()} width={700}>
                <div className='flex justify-center'><Image src={srcIconlogo} alt="" className='rounded-[10px]' width={70} height={70} /></div>
                <div className='flex justify-center text-[32px] font-semibold'>Đăng nhập</div>
                <Tabs defaultActiveKey="client" items={items} onChange={onChange} />
            </Modal>
        </>
    );
};

export default ModalLogin;