import {Layout, Menu, Popconfirm} from 'antd'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {DiffOutlined, EditOutlined, HomeOutlined, LogoutOutlined} from '@ant-design/icons'
import {useStore} from 'store'
import {useEffect} from "react";
import './index.scss'

const { Header, Sider } = Layout

function MyLayout () {
    const {pathname}=useLocation()
    const {userStore, loginStore, channelStore}=useStore()

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
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{userStore.userInfo.name}</span>
                    <span className="user-logout">
                        <Popconfirm
                            onConfirm={onConfirm}
                            title="Ready to exit?" okText="Exit" cancelText="Cancel">
                            <LogoutOutlined /> Exit
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={[pathname]}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item icon={<HomeOutlined />} key="/">
                            <Link to={'/'}>Overview </Link>
                        </Menu.Item>
                        <Menu.Item icon={<DiffOutlined />} key="/article">
                            <Link to={'/article'}>Content Manager</Link>
                        </Menu.Item>
                        <Menu.Item icon={<EditOutlined />} key="/publish">
                            <Link to={'/publish'}>Publish Article</Link>
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
