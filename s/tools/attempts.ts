
export async function attempts<T>(...fns: (() => Promise<T>)[]): Promise<T> {
	let lastError: any
	for (const fn of fns) {
		try {
			return await fn()
		}
		catch (e) {
			lastError = e
			continue
		}
	}
	throw lastError
}

