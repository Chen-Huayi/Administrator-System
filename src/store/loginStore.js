import {makeAutoObservable} from "mobx";
import {http} from "src/utils";

class LoginStore{
    token=''
    constructor() {
        makeAutoObservable(this)
    }

    getToken=async ({mobile, code})=>{
        const result=await http.post('http://geek.itheima.net/v1_0/authorizations', {
            mobile, code
        })
        this.token=result.data.token
    }
}

export default LoginStore
