import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Checkbox } from 'antd';

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

const LoginPage = () => {
    const [redirect, setRedirect] = useState(false);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        axios
            .post('http://localhost:4000/login', {
                email: values.email,
                password: values.password,
            })
            .then(function (response) {
                console.log(response.data);

                if(response.data) {
                    setRedirect(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    if (redirect) {
        //history.pushState('/');
        return <Redirect to="/" />;
    }

    return (
        <div
            style={{
                width: '400px',
                // marginLeft: 'auto',
                // marginRight: 'auto',
                // marginTop: '200px',
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
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;
