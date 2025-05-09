
import {Auth} from "../install.bundle.js"

const auth = await Auth.install()

auth.on(login => {
	if (login) console.log("logged in", login.label)
	else console.log("logged out")
})

