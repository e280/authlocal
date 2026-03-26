
import {validator, deny, allow} from "../utils/yay.js"

export const maxNameLength = 32

export const allowEmptyString = allow<string>(null, s => s === "")

export const validateName = validator<string>(
	deny("leading or trailing whitespace", s => s !== s.trim()),
	deny("too small", s => s.length < 1),
	deny("too big", s => s.length > maxNameLength),
	deny("consecutive spaces", s => /[ ]{2,}/u.test(s)),
	deny("weird whitespace", s => /\s/.test(s.replaceAll(" ", ""))),
	deny("control chars", s => /\p{Z}\p{C}/u.test(s.replaceAll(" ", ""))),
)

