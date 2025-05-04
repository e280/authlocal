
import {signal} from "@benev/slate"
import {Problems} from "./view.js"

export class Problematic {
	problems = signal<string[]>([])

	add(...problems: string[]) {
		this.problems.value = [...this.problems.value, ...problems]
	}

	async captureProblems<T>(fn: () => Promise<T>) {
		try {
			this.problems.value = []
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

