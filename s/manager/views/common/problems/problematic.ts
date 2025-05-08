
import {signal} from "@benev/slate"
import {Problems} from "./view.js"

export class Problematic {
	problems = signal<string[]>([])

	constructor(startWithProblems: string[] = []) {
		this.problems.value = startWithProblems
	}

	add(...problems: string[]) {
		this.problems.value = [...this.problems.value, ...problems]
	}

	clear() {
		this.problems.value = []
	}

	async captureProblems<T>(fn: () => Promise<T>) {
		try {
			return await fn()
		}
		catch (error) {
			this.problems.value = [
				(error instanceof Error)
					? `${error.name}: ${error.message}`
					: `invalid`,
			]
		}
	}

	renderProblems() {
		return this.problems.value.length > 0
			? Problems([this.problems.value])
			: null
	}
}

