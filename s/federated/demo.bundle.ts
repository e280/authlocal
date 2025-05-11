
import {install} from "./prepare.js"

const auth = await install()
auth.on(login => console.log("auth", login))

