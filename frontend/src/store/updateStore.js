import {makeAutoObservable} from "mobx";
import {http} from "utils";

class UpdateStore{
    updateForm = {}
    constructor() {
        makeAutoObservable(this)
    }

    updatePassword = async (values)=>{
        this.updateForm = await http.post('/my/updatepwd', values)

    }

}

export default UpdateStore
