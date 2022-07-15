import {makeAutoObservable} from "mobx";
import {http} from "src/utils";

class ChannelStore{
    channelList=[]
    constructor() {
        makeAutoObservable(this)
    }

    loadChannelList=async ()=>{
        // const res = await http.get('/api/channel')
        // console.log(res)
        // console.log('----------------')
        // console.log(this.channelList)
        // this.channelList=res.data.channels
        // console.log('?')
        // console.log(this.channelList)

    }

}

export default ChannelStore
