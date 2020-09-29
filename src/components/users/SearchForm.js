import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Row, Col, Button, Input } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

import { useAuth } from '../../context/auth';

const SearchForm = ({ handleLoading, setDataSource }) => {

    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();    // Context API ?!

    const { authTokens } = useAuth();

    const onFinish = values => {
        console.log('Received values of form: ', values);

        axios.defaults.headers.common["Authorization"] = `Bearer ${authTokens.token}`;

        handleLoading(true);

        axios
            .get('https://localhost:44380/api/users', {
                params: values
            })
            .then(function (response) {

                // 01. 로그인 성공시 token을 localStorage
                // 02. 메인 페이지로 이동
                console.log(response.data);

                if(response.status === 200) {
                    //setAuthTokens(response.data);
                    //setLoggedIn(true);

                    setDataSource(response.data);
                }
                else {
                    //message.error('아이디, 비밀번호 틀림1');
                    // setIsError(true);
                }
            })
            .catch(function (error) {
                console.log(error);
                //message.error('아이디, 비밀번호 틀림2');
                // setIsError(true);
            })
            .finally(() => {
                handleLoading(false);
            });
    };

    return (
        <Form 
            form={form}
            onFinish={onFinish}
        >
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item
                        name={`email`}
                        label={`이메일`}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name={`name`}
                        label={`이름`}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">Search</Button>
                    <Button style={{
                                margin: '0 8px',
                            }}
                            onClick={() =>{
                                form.resetFields();
                            }}
                    >
                        Clear
                    </Button>
                    <Button
                        type="link"
                        style={{
                            fontSize: 12,
                        }}
                        onClick={() => {
                            setExpand(!expand);
                        }}
                    >
                        {expand ? <UpOutlined /> : <DownOutlined />} Collapse
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchForm;