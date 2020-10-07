import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, PageHeader, Avatar, Popover } from 'antd';
import {
    DesktopOutlined,
    UserOutlined
} from '@ant-design/icons';
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const content = () => {
    return (
        <div>
            <p><Link to="/login">로그인</Link></p>
            <p>Content</p>
        </div>
    )
};

const CustomAvatar = () => {
    return (
        <Popover placement="bottomRight" content={content} title="Title" trigger="click">
            <Avatar size="default" icon={<UserOutlined />} />
            {/* <span className="avatar-item">
                <Badge count={1} size="small">
                    
                </Badge>
            </span> */}
        </Popover>
    );
};

const Main = ({children}) => {

    const [collapsed, setCollapsed] = useState(false);
    
    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" style={{
                    height: '36px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    margin: '16px'
                }} />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <SubMenu key="1" icon={<UserOutlined />} title="회원">
                        <Menu.Item key="1SUB1">
                            <Link to="/users">회원관리</Link>
                        </Menu.Item>
                        <Menu.Item key="1SUB2">일지</Menu.Item>
                        <Menu.Item key="1SUB3">루틴</Menu.Item>
                        <Menu.Item key="1SUB4">식단</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="2" icon={<FontAwesomeIcon icon={faDumbbell} style={{ width: '14px', marginRight: '10px' }} />}>
                        <Link to="/exercise">운동관리</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<DesktopOutlined />}>
                        컨텐츠관리
                    </Menu.Item>
                    <Menu.Item key="4" icon={<DesktopOutlined />}>
                        코드관리
                    </Menu.Item>
                    <Menu.Item key="5" icon={<DesktopOutlined />}>
                        게시판관리
                    </Menu.Item>
                    {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu> */}
                </Menu>
            </Sider>
            <Layout>
                
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <PageHeader extra={[ <CustomAvatar /> ]}  />
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
        </Layout>
    );
};

export default Main;