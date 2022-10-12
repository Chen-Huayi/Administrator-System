import {makeAutoObservable} from "mobx";
import {http} from "utils";

class UpdateStore{
    updateForm = {}
    constructor() {
        makeAutoObservable(this)
    }

    updatePassword = async (values)=>{
        this.updateForm = await http.post('/api/updatepwd', values)
    }

}

export default UpdateStore
