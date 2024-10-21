
import {Nexus} from "@benev/slate"
import {Auth} from "./auth/auth.js"
import {theme} from "../common/theme.js"

export const auth = new Auth()
export const nexus = new Nexus({theme, auth})

