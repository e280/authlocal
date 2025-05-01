
export async function nullcatch<R>(fn: () => Promise<R>) {
	try {
		return await fn()
	}
	catch {
		return null
	}
}

