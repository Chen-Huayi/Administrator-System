import {Layout, Menu, Popconfirm} from 'antd'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {
    DiffOutlined,
    EditOutlined,
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons'
import {useStore} from 'store'
import React, {useEffect, useState} from "react";
import './index.scss'

const { Header, Sider } = Layout

function MyLayout () {
    const {pathname}=useLocation()
    const {userStore, loginStore, channelStore}=useStore()
    const [collapsed, setCollapsed] = useState(false);

    useEffect(()=>{
        userStore.getUserInfo()
        channelStore.loadChannelList()
    }, [userStore, channelStore])

    const navigate=useNavigate()
    const onConfirm=()=>{
        loginStore.logOut()
        userStore.clearUserInfo()
        navigate('/login')
    }

    return (
        <Layout>
            <Header className="header" >
                <div className="logo" />
                <div className="user-info">
                    <span className="user-profile">{userStore.userInfo.name}</span>
                    <span className="user-profile">{userStore.userInfo.email}</span>
                    <span className="user-logout">
                        <Popconfirm
                            onConfirm={onConfirm}
                            title="Ready to exit?" okText="Exit" cancelText="Cancel">
                            <LogoutOutlined /> Log Out
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider className="site-layout-background"
                       collapsible collapsed={collapsed}
                       onCollapse={(value) => setCollapsed(value)}
                       width={170}
                >
                    <Menu
                        mode="inline"
                        theme="light"
                        defaultSelectedKeys={[pathname]}
                        style={{ height: '100%', borderRight: 0, 'font-size': 'large' }}
                    >
                        <Menu.Item icon={<HomeOutlined />} key="/">
                            <Link to={'/'}>Overview </Link>
                        </Menu.Item>
                        <Menu.Item icon={<DiffOutlined />} key="/article">
                            <Link to={'/article'}>Content</Link>
                        </Menu.Item>
                        <Menu.Item icon={<EditOutlined />} key="/publish">
                            <Link to={'/publish'}>Publish</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}

export default observer(MyLayout)
