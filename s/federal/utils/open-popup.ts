
export function openPopup(url: string) {
	const features = "width=500,height=600,resizable=yes,scrollbars=yes,noreferrer"
	return window.open(url, "auth", features)
}

