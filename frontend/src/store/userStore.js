import {makeAutoObservable} from "mobx";
import {http} from "utils";

class UserStore {
    userInfo={}
    constructor() {
        makeAutoObservable(this)
    }

    getUserInfo = async() =>{
        // const res = await http.get('http://geek.itheima.net/v1_0/user/profile')
        // this.userInfo = res.data
        // this.userInfo = await http.get('/api/profile')
    }


}
export default UserStore
