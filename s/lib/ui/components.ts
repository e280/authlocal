
import {got} from "@e280/stz"
import {shadowElement, useAttrs} from "@e280/sly"
import {Poster} from "./views/poster/view.js"

export class AuthPoster extends shadowElement(() => {
	const attrs = useAttrs({"hexid": String, "alias": String})
	return Poster(got(attrs.hexid, ""), attrs.alias)
}) {}

