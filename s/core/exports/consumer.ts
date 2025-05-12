
//
// this file exports everything the *consumer* app needs.
// the comments tell a linear story about the flow.
//

// we receive a session from the authority via postmessage.
export {Session} from "../concepts/session/types.js"

// we verify the session as a login object.
export {Login} from "../concepts/session/login.js"

// we use the login object to sign claim tokens.
export {LoginSignClaimOptions} from "../concepts/session/types.js"
export {SignClaimOptions} from "../concepts/claim/types.js"

// we verify claim tokens, on our serverside or clientside.
export {verifyClaim} from "../concepts/claim/claims.js"
export {ClaimPayload} from "../concepts/claim/types.js"
export {VerifyClaimOptions} from "../concepts/claim/types.js"

