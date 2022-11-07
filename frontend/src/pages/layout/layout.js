import {Dropdown, Layout, Menu, Popconfirm} from 'antd'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {DiffOutlined, EditOutlined, HomeOutlined, LogoutOutlined, SettingFilled} from '@ant-design/icons'
import {useStore} from 'store'
import React, {useEffect, useState} from "react";
import './layout.scss'

const { Header, Sider } = Layout

function MyLayout () {
    const {pathname}=useLocation()
    const navigate=useNavigate()
    const {userStore, loginStore, channelStore}=useStore()
    const [collapsed, setCollapsed] = useState(false);

    // Display user and channel id information
    useEffect(()=>{
        userStore.getUserInfo()
        channelStore.loadChannelList()
    }, [userStore, channelStore])

    const updateProfile=()=>{
        navigate('/update-profile')
    }

    const resetPwd=()=>{
        navigate('/reset-pwd')
    }

    const onConfirm=()=>{
        loginStore.logOut()
        userStore.clearUserInfo()
        navigate('/login')
    }

    // Setting Menu button: has two functionalities
    const menu = (
        <Menu
            items={[
                {
                    label: <button onClick={updateProfile} style={{width: "120px"}}>Update profile</button>
                },
                {
                    label: <button onClick={resetPwd} style={{width: "120px"}}>Reset password</button>
                }
            ]}
        />
    );

    return (
        <Layout>
            <Header className="header" >
                <div className="logo" />
                <div className="user-info">
                    <span className="user-profile">{userStore.userInfo.name}</span>
                    <span className="user-profile">{userStore.userInfo.email}</span>
                    <span className="user-profile">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()} >
                                <SettingFilled/>
                            </a>
                        </Dropdown>
                    </span>
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
                        style={{ height: '100%', borderRight: 0, 'fontSize': 'large' }}
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
