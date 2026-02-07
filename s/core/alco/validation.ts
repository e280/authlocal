
import {validator, deny} from "../utils/yay.js"

export const maxLabelLength = 32

export const validateLabel = validator<string>(
	deny("no leading or trailing whitespace", s => s !== s.trim()),
	deny("too small", s => s.length < 1),
	deny("too big", s => s.length > maxLabelLength),
	deny("no consecutive spaces", s => /[ ]{2,}/u.test(s)),
	deny("no whitespace except ordinary spaces", s => /\s/.test(s.replaceAll(" ", ""))),
	deny("no control chars", s => /\p{Z}\p{C}/u.test(s.replaceAll(" ", ""))),
)

