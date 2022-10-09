import React from "react"
import LoginStore from './loginStore'
import UserStore from './userStore'
import ChannelStore from './channelStore'
import RegisterStore from './registerStore';

class RootStore {
    constructor() {
        this.loginStore = new LoginStore()
        this.userStore = new UserStore()
        this.channelStore = new ChannelStore()
        this.registerStore = new RegisterStore()
    }
}

const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
