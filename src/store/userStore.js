import {makeAutoObservable} from "mobx";
import {http} from "src/utils";

class UserStore {
    userInfo={}
    constructor() {
        makeAutoObservable(this)
    }
    async getUserInfo() {
        // const res = await http.get('http://geek.itheima.net/v1_0/user/profile')
        // this.userInfo = res.data
        this.userInfo = await http.get('/api/profile')
    }

    async clearUserInfo() {
        this.userInfo = await http.put('/api/profile')
    }

}
export default UserStore
