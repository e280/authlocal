
//
// toolkit of core environment-agnostic functionality
//  - browser, node, deno, bun, etc
//  - provides crypto fns for verifying claims, etc
//

export {Thumbprint, Bytename, Hex, Base58, sub, Sub} from "@e280/stz"

export {signClaim, verifyClaim, SignClaimOptions, VerifyClaimOptions, ClaimPayload} from "./core/claims.js"
export {Nametag} from "./core/identity.js"
export {Login, VerifyLoginOptions, LoginSignClaimOptions} from "./core/login.js"
export {Proof, verifyProof, VerifyProofOptions, ProofPayload} from "./core/proof.js"
export {Session} from "./core/session.js"
export {TokenParams, TokenPayload} from "./core/token.js"

export * from "./common/utils/id-hue.js"
export * from "./common/utils/validation.js"

export * from "./tools/time.js"

