
import {validator, deny, Validator, maybe} from "@e280/stz"

export const maxNameLength = 32

export const validateName = validator<string>(
	deny("bad leading or trailing whitespace", s => s !== s.trim()),
	deny("too small", s => s.length < 1),
	deny("too big", s => s.length > maxNameLength),
	deny("bad consecutive spaces", s => /[ ]{2,}/u.test(s)),
	deny("bad weird whitespace", s => /\s/.test(s.replaceAll(" ", ""))),
	deny("bad unicode control chars", s => /\p{Z}\p{C}/u.test(s.replaceAll(" ", ""))),
)

export function allowEmptyString(validate: Validator<string>): Validator<string> {
	return (s: string) => (
		(s === "")
			? maybe.yay(s)
			: validate(s)
	)
}

