import React from "react"
import LoginStore from './loginStore'
import UserStore from './userStore'
import ChannelStore from './channelStore'

class RootStore {
    constructor() {
        this.loginStore = new LoginStore()
        this.userStore = new UserStore()
        this.channelStore = new ChannelStore()
    }
}

const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
