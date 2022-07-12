import {getToken} from "src/utils";
import {Navigate} from 'react-router-dom'

function AuthComponent({child}){
    const isToken=getToken()
    if (isToken){
        return <>{child}</>
    }else {
        return <Navigate to="/login" replace/>
    }
}

export {AuthComponent}
