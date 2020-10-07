import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useAuth } from '../../context/auth';

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 16,
    },
};

const Login = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const { setAuthTokens } = useAuth();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        axios
            .post('https://localhost:44380/api/Login', {
                email: values.email,
                password: values.password,
            })
            .then(function (response) {

                // 01. 로그인 성공시 token을 localStorage
                // 02. 메인 페이지로 이동
                console.log(response.data);

                if(response.status === 200) {
                    setAuthTokens(response.data);
                    setLoggedIn(true);
                }
                else {
                    message.error('아이디, 비밀번호 틀림1');
                    // setIsError(true);
                }
            })
            .catch(function (error) {
                message.error('아이디, 비밀번호 틀림2');
                // setIsError(true);
            });
    };

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div
                style={{
                    width: '400px'
                }}
            >
                <Form {...layout} onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email.',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password.',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        {...tailLayout}
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
