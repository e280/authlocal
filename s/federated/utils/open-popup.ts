
export function openPopup(url: string) {
	const features = "width=700,height=800,resizable=yes,scrollbars=yes"
	return window.open(url, "auth", features)
}

