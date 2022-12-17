import {makeAutoObservable} from "mobx";
import {getToken, http, removeToken, setToken} from "utils";

class LoginStore{
    token=getToken() || ''
    constructor() {
        makeAutoObservable(this)
    }

    getToken=async (values)=>{
        // const result=await http.post('http://geek.itheima.net/v1_0/authorizations', {mobile, code})
        // this.token=result.data.token
        //////////////////------------------------------------------------------------
        const result=await http.post('/api/login', values)
        this.token=result.token
        if (result.status===1)
            this.token=''

        setToken(this.token)
    }

    logOut=()=>{
        this.token=''
        removeToken()
    }
}

export default LoginStore
