
import {install} from "./lib/parts/install.js"

const {auth} = await install()

auth.on(login => console.log("auth", login))

