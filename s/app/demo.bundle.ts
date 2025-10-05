
import {install} from "./lib/parts/install.js"
import {basic} from "./lib/themes/basic.css.js"

const {auth} = await install({theme: basic})

auth.on(login => console.log("auth", login))

