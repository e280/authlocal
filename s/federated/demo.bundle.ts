
import {install} from "./install.js"

const auth = await install()
auth.on(login => console.log("auth", login))

