
export function openPopup(url: string) {
	const features = "width=500,height=600,resizable=yes,scrollbars=yes"
	return window.open(url, "auth", features)
}

