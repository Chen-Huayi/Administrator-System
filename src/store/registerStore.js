import {makeAutoObservable} from "mobx";
import {http} from "utils";

class RegisterStore{
    registerForm = {}
    constructor() {
        makeAutoObservable(this)
    }

    setUserForm = async (values)=>{
        this.registerForm = await http.post('/api/register', values)
    }
}

export default RegisterStore
