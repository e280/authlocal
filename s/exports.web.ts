
//
// functionality exposed to consumer apps
//  - web browser support (not node/bun/deno etc)
//  - provides web components and such
//

export * from "./exports.core.js"

export {register, apply, mixin, css, CSSResultGroup} from "@benev/slate"

export * from "./app/auth.js"
export * from "./app/install.js"

export * from "./app/types.js"
export * from "./app/elements/auth-user/element.js"
export * from "./app/elements/auth-button/element.js"

export * from "./common/views/copyable/view.js"
export * from "./common/elements/auth-sigil/element.js"

