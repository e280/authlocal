
export function getOrigin(url: string, base = window.location.href) {
	return new URL(url, base).origin
}

