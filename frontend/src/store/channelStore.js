import {makeAutoObservable} from "mobx";
import {http} from "utils";

class ChannelStore{
    channelList=[]
    constructor() {
        makeAutoObservable(this)
    }

    loadChannelList = async ()=>{
        const res = await http.get('/my/channel')
        this.channelList=res.channel_name
    }
}

export default ChannelStore
