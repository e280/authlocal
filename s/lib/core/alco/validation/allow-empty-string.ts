
import {Validator, yay} from "@e280/stz"

export function allowEmptyString(validate: Validator<string>): Validator<string> {
	return (s: string) => (
		(s === "")
			? yay(s)
			: validate(s)
	)
}

