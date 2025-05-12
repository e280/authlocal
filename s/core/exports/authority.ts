
//
// this file exports everything the *authority* app needs.
// the comments tell a linear story about the flow.
//

// we generate an identity for the user.
export {Identity} from "../concepts/identity/types.js"
export {generateIdentity} from "../concepts/identity/identity.js"

// the user can save their seed, or recover their identity from seed.
export {seedPack} from "../concepts/identity/seed.js"
export {seedRecover} from "../concepts/identity/seed.js"
export {dedupeIdentities} from "../concepts/identity/identity.js"

// when the user clicks "login", we generate a login session,
// and we send that to the consumer app via postmessage.
export {Session} from "../concepts/session/types.js"
export {generateSession} from "../concepts/session/session.js"

