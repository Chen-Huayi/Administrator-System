import {makeAutoObservable} from "mobx";
import {http, setToken, getToken, removeToken} from "src/utils";

class LoginStore{
    token=getToken() || ''
    constructor() {
        makeAutoObservable(this)
    }

    getToken=async ({mobile, code})=>{
        // const result=await http.post('http://geek.itheima.net/v1_0/authorizations', {mobile, code})
        // this.token=result.data.token
        //////////////////------------------------------------------------------------
        const result=await http.post('/api/login', {mobile, code})
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
