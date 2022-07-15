import {makeAutoObservable} from "mobx";
import {http} from "src/utils";

class UserStore {
    userInfo={}
    constructor() {
        makeAutoObservable(this)
    }
    async getUserInfo() {
        const res = await http.get('http://geek.itheima.net/v1_0/user/profile')
        this.userInfo = res.data
    }

}
export default UserStore
