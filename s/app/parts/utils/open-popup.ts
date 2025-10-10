
export function openPopup(url: string) {
	const width = 700
	const height = 800

	const centerX = window.screenX + (window.outerWidth / 2)
	const centerY = window.screenY + (window.outerHeight / 2)

	const left = centerX - (width / 2)
	const top = centerY - (height / 2)

	const features = [
		`width=${width}`,
		`height=${height}`,
		`left=${left}`,
		`top=${top}`,
		`resizable=yes`,
		`scrollbars=yes`,
	].join(",")

	return window.open(url, "auth", features)
}

