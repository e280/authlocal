
import {install} from "./parts/install.js"
import {basic} from "./themes/basic.css.js"

const {auth} = await install({theme: basic})

auth.on(login => console.log("auth", login))

