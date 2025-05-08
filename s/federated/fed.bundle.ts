
import {Auth} from "../install.bundle.js"

const auth = await Auth.install()

auth.on(login => {
	if (login) console.log("login", login.label)
	else console.log("logout")
})

