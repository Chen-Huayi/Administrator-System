import {Button, Card, Checkbox, Form, Input, message} from "antd";
import logo from 'src/assets/login_logo.jpg'
import './index.scss'
import {useNavigate} from 'react-router-dom'
import {useStore} from "src/store";


function Login() {
    const {loginStore}=useStore()
    const navigate=useNavigate()

    async function onFinished(values){
        await loginStore.getToken({
            mobile: values.username,
            code: values.password
        })

        navigate('/', {replace: true})

        if (loginStore.token!==''){
            message.success('Successfully login')
        }else {
            message.error('Login failure')
        }
    }

    function onFinishedFailed(err){
        console.log('Failed: ', err)
    }

    function register(){
        // TODO
        console.log('666')
    }

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />

                <Form
                    initialValues={{
                        remember: true,
                        // mobile: 12345678900,
                        // code: 246810
                    }}
                    onFinish={onFinished}
                    onFinishFailed={onFinishedFailed}
                >

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                // pattern: /^1[3-9]\d{9}$/,
                                // message: '手机号码格式不对',
                                validateTrigger: 'onBlur'
                            },
                            {
                                required: true,
                                message: 'Username required',
                                validateTrigger: 'onBlur'
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Enter username" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                len: 8,
                                // message: 'Need 8 character password',
                                validateTrigger: 'onBlur'
                            },
                            {
                                required: true,
                                message: 'Password required'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="Password" maxLength={8} />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox className="login-checkbox-label">
                            I agree the terms and conditions
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <div className="submit-button">
                            <Button type="primary" htmlType="submit" size="middle" shape="round" style={{width : '100px'}}>
                                Log in
                            </Button>
                        </div>

                    </Form.Item>
                </Form>

                <div className="register-button">
                    <Button type="primary" htmlType="submit" size="middle" shape="round" style={{width : '100px'}} onClick={register}>
                        Sign up
                    </Button>
                </div>

            </Card>
        </div>
    )
}

export default Login
