
import {Badge, Hex} from "@e280/stz"
import {IdView} from "./view.js"
import {idPreview} from "../../../tools/id-preview.js"

export const renderId = (id: string) => {
	const bytes = Hex.bytes(id)
	const badge = Badge.string(bytes)
	const preview = idPreview(id)
	return IdView([badge, preview])
}

