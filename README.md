
# 🔒 [Authlocal.org](https://authlocal.org/) Developer Readme
> ***Not a developer?*** See the [User Guide](GUIDE.md) instead

🔑 **Elliptic** – identities are [`@noble/ed25519`](https://github.com/paulmillr/noble-ed25519) keypairs  
🏛️ **Federated** – your app gets user logins from [authlocal.org](https://authlocal.org/) popup  
📱 **Clientside** – statically deployed, no api servers  
📜 **Protocol** – permissionless integration, you can do it your way  
🥧 **Easy as pie** – setup your app with an easy snippet  

### A cryptographic login system for the world wide web
Authlocal can provide free auth for everybody.

### A free login system for your website
- Try out the example integration live demo here: https://authlocal.org/federated/
- Your users click "Login", pick an identity, then *boom!* — they're logged into your site.
- Next, you can use claim tokens, for your server to verify user requests.
- And all this costs you nothing.

<br/>

## Authlocal installation and setup

### Quick start
1. Pick one of these install techniques
    1. **HTML install technique**  
        Put this script into your html `<head>`:
        ```html
        <script type="module">
          import Auth from "https://authlocal.org/install.bundle.min.js"
          const auth = await Auth.install()

          // Handle user logins and logouts
          auth.on(login => {
            if (login) console.log("logged in", login.nametag)
            else console.log("logged out")
          })
        </script>
        ```
    1. **Webdev install technique**  
        Install the package into your project:
        ```sh
        npm install @authlocal/authlocal
        ```
        Write this in your app's js entrypoint (like `main.ts`):
        ```ts
        import Auth from "@authlocal/authlocal"
        const auth = await Auth.install()

        // Handle user logins and logouts
        auth.on(login => {
          if (login) console.log("logged in", login.nametag)
          else console.log("logged out")
        })
        ```
1. Put this stylesheet into your html `<head>`:
    ```html
    <link rel="stylesheet" href="https://authlocal.org/themes/basic.css"/>
    ```
1. Place these new auth elements anywhere in your html `<body>`:
    ```html
    <auth-user></auth-user>
    <auth-button></auth-button>
    ```
1. Take it for a spin! You should be able to login and logout.

### Anatomy of a `login`
- **`login.id` unique id for a user**
  > eg, `"a08263e70a0a48a07e988a7c0931ada6b0a38fa84bf367087b810c614a4c2070"`  
  > *(it's actually the user identity public key)*
- **`login.label` — user's chosen nickname**
  > eg, `"Michael Scott"`

<br/>

## Authlocal claims

#### Okay, so you have a user's `login`. Now what?
- The purpose of a login is to *sign claims* on the user's behalf.
- You must *never* send the login data anywhere. It should stay on the user's clientside device.
- The login is automatically persisted in `localStorage`.

#### The purpose of a claim is to say *"on behalf of this user, my frontend says..."*
- "...they want to post this message"
- "...they want to change their avatar"
- "...they want to buy this microtransaction"

#### Claims are secured cryptographically.
- Claims contain cryptographic proof that they stem from a user's login.
- No attacker can spoof a claim for somebody else's identity.

### Sign a claim
```js
import {Future} from "@authlocal/authlocal"

const claimToken = await login.signClaim({

  // any json-friendly data you want
  claim: {message: "i love ice cream"},

  // when should this claim expire?
  expiresAt: Future.hours(24),
})
```

### Verify a claim
```js
import {verifyClaim} from "@authlocal/authlocal"

const {claim, proof} = await verifyClaim({
  claimToken,
  appOrigins: ["https://example.e280.org"],
})

proof.sessionId
  // id for this login session, looks like:
  // "ff730fe2d725aa5210152975212d1068d7fe28ae22b5e62337a4cde42215187a"

proof.nametag.id
  // user identity id, looks like:
  // "a08263e70a0a48a07e988a7c0931ada6b0a38fa84bf367087b810c614a4c2070"

proof.nametag.label
  // user identity nickname, looks like:
  // "Michael Scott"
```
- You can verify claims on the clientside or serverside.
- You must specify what `appOrigins` you expect to receive claims from (this prevents phishing attacks).

<br/>

## Glossary
- **Keypair** — an ed25519 keypair
  - `.id` is the public key (64 character hex string)
  - `.secret` is the private key (64 character hex string)
- **Identity** — a keypair with a label string
- **Seed** — text snippet or `.seed` file that stores an identity
- **Nametag** — the public data associated with a user's identity
    - `.id` is the public key (64 character hex string)
    - `.label` is a nickname (max 32 character string)
- **Thumbprint** — easier-to-read version of an id
    - looks like: `dozmut.winpex::2qeewYscUfjLDzTyMADvruUN8kxzTkMVg7WTSv8`
    - `sigil` is the first part: `dozmut.winpex`
    - `bulk` is the second part: `2qeewYscUfjLDzTyMADvruUN8kxzTkMVg7WTSv8`
- **Login** — a login session
    - is private, should never leave the user's device
    - `.nametag` contains the identity's id and label
    - `.expiresAt` js time of the moment this login expires
    - `.isExpired()` returns true if the login is now expired
- **Proof** — provenance for login
    - is a token signed by an identity
    - is public, can be shared around
    - `.nametag` contains the identity's id and label
    - `.sessionId` proves a login session is blessed by an identity
- **Claim** — arbitrary claim your frontend can make
    - is a token signed by the login session, verifiable on your server
    - is public, can be shared around
    - includes the proof token (thus nametag and sessionId)
    - includes any arbitrary claim data you want

<br/>

## Common code snippets

You can do these on the clientside or serverside.

#### Thumbprint conversions
```ts
import {Thumbprint} from "@authlocal/authlocal"
```
- **id to thumbprint**
    ```ts
    Thumbprint.fromHex("005636bab2c73223ccf56f8112432212f57f01ef61452762cd142acd61ed44ed")
      // "dozmut.winpex::2qeewYscUfjLDzTyMADvruUN8kxzTkMVg7WTSv8"
    ```
- **id to sigil**
    ```ts
    Thumbprint.sigil.fromHex("005636bab2c73223ccf56f8112432212f57f01ef61452762cd142acd61ed44ed")
      // "dozmut.winpex"
    ```
- **thumbprint to id**
    ```ts
    Thumbprint.toHex("dozmut.winpex::2qeewYscUfjLDzTyMADvruUN8kxzTkMVg7WTSv8")
      // "005636bab2c73223ccf56f8112432212f57f01ef61452762cd142acd61ed44ed"
    ```

<br/>

## Seed text format

### Seed text format
- Seeds can be copy-pasted, or live in a `my-identity.seed` file. Seed text looks like this:
    ```
    "mopfed.nimrut"
     linler.torhul.datmyn.binwep
     dilmyr.lagruc.nopwyl.witfur
     fasnes.sonpes.fostyr.foddur
     datter.diswyl.dotfer.wannul
     nomsum
    ```
- There can be any number of seeds in the text
- Whitespace and funky characters are ignored. this is a valid seed:
    ```
    ""linlertorhuldatmynbinwepdilmyrlagrucnopwylwitfurfasnessonpesfostyrfoddurdatterdiswyldotferwannulnomsum
    ```
- Seeds have three parts:
    - **the label** is a handy nickname that the user assigned, expressed in *json* format.
        ```
        "mopfed.nimrut"
        ```
    - **the 256-bit ed25519 private key**, expressed as 16 [*bytename*](https://github.com/e280/stz?tab=readme-ov-file#bytename) words.
        ```
        linler.torhul.datmyn.binwep
        dilmyr.lagruc.nopwyl.witfur
        fasnes.sonpes.fostyr.foddur
        datter.diswyl.dotfer.wannul
        ```
    - **the 2-byte sha256 checksum** ensures the private key wasn't mistyped.
        ```
        nomsum
        ```

<br/>

## Strategies for user-sovereign auth

### Users will lose their identities, so have a recovery plan

When you sell a service or digital goods to a user's Authlocal identity, you'll need to have a recovery mechanism, or people will get cranky.

It may be wise to sell the digital goods to an email address, which can be used for recovery (email flow to reset goods ownership to new authlocal id). In this case, you allow the user to trade some privacy (email address, payment method) to buy stuff with recovery safety.

<br/>

## 💖 [Authlocal](https://authlocal.org/) is free and open source

My name is Chase Moskal, and I built Authlocal because I wanted free user-centric auth to power [benevolent.games](http://benevolent.games/).

Got questions or feedback? Don't hesitate to open a github issue or discussion anytime.

Like the project? Star it on github, it's the only way I'm paid.

Authlocal is associated with my project [e280.org](https://e280.org/), the buildercore collective.

