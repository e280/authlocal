
export function openPopup(url: string) {
	const width = 800
	const height = 900

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

	console.log(features)

	return window.open(url, "auth", features)
}

