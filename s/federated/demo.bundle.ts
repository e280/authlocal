
import {Auth} from "../install.bundle.js"

const auth = await Auth.install()

auth.on(login => console.log("auth", login))

