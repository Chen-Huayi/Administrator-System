import {makeAutoObservable} from "mobx";
import {getToken, http, removeToken, setToken} from "utils";

class LoginStore{
    token=getToken() || ''
    username
    email

    constructor() {
        makeAutoObservable(this)
    }

    getToken=async (values)=>{
        // const result=await http.post('http://geek.itheima.net/v1_0/authorizations', {mobile, code})
        // this.token=result.data.token
        //////////////////------------------------------------------------------------
        const result=await http.post('/api/login', values)

        if (result.status===1){
            this.token=''
        }else {
            this.token=result.token
            this.username=result.username
            this.email=result.email
        }
        setToken(this.token)
    }

    logOut=()=>{
        this.token=''
        removeToken()
    }
}

export default LoginStore
