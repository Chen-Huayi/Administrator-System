import {makeAutoObservable} from "mobx";
import {http, setToken, getToken} from "src/utils";

class LoginStore{
    token=getToken() || ''
    constructor() {
        makeAutoObservable(this)
    }

    getToken=async ({mobile, code})=>{
        const result=await http.post('http://geek.itheima.net/v1_0/authorizations', {
            mobile, code
        })
        this.token=result.data.token
        setToken(this.token)
    }
}

export default LoginStore
