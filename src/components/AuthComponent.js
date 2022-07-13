import {getToken} from "src/utils";
import {Navigate} from 'react-router-dom'


function AuthComponent({children}){
    const isToken=getToken()
    if (isToken){
        return <>{children}</>
    }else {
        return <Navigate to="/login" replace/>
    }
}

export {AuthComponent}

// <AuthComponent> <Layout/> </AuthComponent>
// 登录：<><Layout/></>
// 非登录：<Navigate to="/login" replace />

