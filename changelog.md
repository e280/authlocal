
# `@authduo/authduo` changelog

- 🟥 *harmful -- breaking change*
- 🔶 *maybe harmful -- deprecation, or possible breaking change*
- 🍏 *harmless -- addition, fix, or enhancement*

<br/>

--------

## v0.1

### v0.1.0
- 🟥 rewrite: tokens
  - now we discourage passing login tokens around, that's basically like passing the user's identity around, and anybody holding that token can impersonate the user
  - now each login token contains an ephemeral keypair relevant to that specific login
  - this means a login is capable of signing data arbitrarily on behalf of the passport
  - so, now, it's recommended that apps should use `login.signChallengeToken` to produce their own access tokens

<br/>

## v0.0

### v0.0.3
- 🔶 add: required param `issuer` to `passport.signLoginToken(params)`
- 🍏 fix: bug with cross-domain logins
- 🍏 add: login token verification options `allowedAudiences` and `allowIssuers`

### v0.0.2
- 🍏 fix: the login signal firing in a loop

### v0.0.1
- 🔶 deprecate: `passport.signAccessToken`, use `passport.signLoginToken` instead
- 🍏 fix: nodejs and deno compat for auth functions
- 🍏 add: test suite for auth functionality on nodejs

### v0.0.0
- initial release

