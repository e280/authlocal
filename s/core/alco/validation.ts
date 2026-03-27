
import {validator, deny} from "@e280/stz"

export const maxNameLength = 32

export const validateName = validator<string>(
	deny("avoid leading or trailing whitespace", s => s !== s.trim()),
	deny("too small", s => s.length < 1),
	deny("too big", s => s.length > maxNameLength),
	deny("avoid consecutive spaces", s => /[ ]{2,}/u.test(s)),
	deny("avoid weird whitespace", s => /\s/.test(s.replaceAll(" ", ""))),
	deny("avoid unicode control chars", s => /\p{Z}\p{C}/u.test(s.replaceAll(" ", ""))),
)

