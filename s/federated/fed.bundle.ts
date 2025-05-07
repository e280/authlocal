
import {Auth} from "../install.bundle.js"
import theme from "../themes/basic.css.js"

const auth = await Auth.install({theme})

auth.on(login => {
	if (login) console.log("login", login.label)
	else console.log("logout")
})

