
export class EnsureError extends Error {
	constructor(message: string) {
		super(`failed validation: ${message}`)
	}
}

function fn<X>(kind: string, validate: (x: X) => boolean) {
	return (name: string, x: X) => {
		if (!validate(x))
			throw new EnsureError(`${name} should be ${kind}`)
		return x
	}
}

export const ensure = {
	string: fn<string>("string", x => typeof x === "string"),
	number: fn<number>("number", x => typeof x === "number"),
	boolean: fn<boolean>("boolean", x => typeof x === "boolean"),
	array: fn<any[]>("array", x => Array.isArray(x)),
	object: fn<{}>("object", x => typeof x === "object" && !Array.isArray(x)),
}

