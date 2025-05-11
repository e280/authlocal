
![](https://i.imgur.com/Ao6piCO.png)

# 🔒 [Authlocal.org](https://authlocal.org/) Developer Readme
> ***Not a developer?*** See the [User Guide](GUIDE.md) instead

🏛️ **Federated** – your app gets user logins from [authlocal.org](https://authlocal.org/) popup  
🔑 **Elliptic** – identities are [`@noble/ed25519`](https://github.com/paulmillr/noble-ed25519) keypairs  
📱 **Clientside** – statically deployed, no api servers  
📜 **Protocol** – permissionless integration, do it your way  
🥧 **Easy as pie** – setup your app with two easy snippets  
💖 **MIT Licensed** – totally free and open source  

### A free login system for the world wide web
- Try out the example integration live demo here: https://authlocal.org/federated/
- Your users click "Login", pick an identity, then *boom!* — they're logged into your site.
- Next, you can use claim tokens, for your server to verify user requests.

<br/>

## Authlocal installation and setup

### Quick start
1. Pick one of these javascript install techniques
    1. **HTML install technique**  
        Put this script into your html `<head>`:
        ```html
        <script type="module">
          import {install} from "https://authlocal.org/install.bundle.min.js"
          const auth = await install()
          auth.on(login => console.log("auth", login))
        </script>
        ```
    1. **Webdev install technique**  
        Install the package into your project:
        ```sh
        npm install @authlocal/authlocal
        ```
        Write this in your app's js entrypoint (like `main.ts`):
        ```ts
        import {install} from "@authlocal/authlocal"
        const auth = await install()
        auth.on(login => console.log("auth", login))
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
1. Take it for a spin! You can now login, and logout.

### Alternative setup: headless install without UI

Use this technique if you want to make your own UI, and don't want to load any of the authlocal elements.

1. Create the Auth object manually, and trigger the initial load from storage:
    ```ts
    import {Auth} from "@authlocal/authlocal"

    const auth = new Auth()
    await auth.loadLogin()

    auth.on(login => console.log("auth", login))
    ```
1. You can trigger the authlocal popup, prompting the user to login, like this:
    ```ts
    await auth.popup()
    ```
    - but remember, the call *must* originate from a user action like clicking a button, otherwise the browser's popup browser will ignore it.

### Understanding logins

You must *never* send the *login* data anywhere, it stays on the user's device.

The login is automatically persisted in `localStorage` for 7 days.

The anatomy of a login:
- `login.sessionId` — id of the login session hex string
- `login.nametag.id` — user identity public key hex string
- `login.nametag.label` — user's chosen nickname
- `login.expiresAt` — js timestamp of when this login expires
- `login.isExpired()` — returns true if the login is expired now
- `login.signClaim(options)` — sign a claim (more on this later)

<br/>

## Authlocal's custom html elements

### auth-button

![](https://i.imgur.com/U9q3K9B.png)

![](https://i.imgur.com/1nExBR4.png)

```html
<auth-button></auth-button>
```

It's a "Login" button, that when clicked, spawns an Authlocal popup.

When the user is logged in, the button changes to a "Logout" button, which when clicked, will log the user out.

In javascript you can listen for logins/logouts via the button like this:
```js
const authButton = document.querySelector("auth-button")

authButton.on(login => console.log("auth", login))
  //       👆
  // listen to *this* specific button

authButton.auth.on(login => console.log("auth", login))
  //        👆
  // listen to *any* button
```

### auth-user

![](https://i.imgur.com/EzWVjva.png)

```html
<auth-user></auth-user>
```

Displays the user's own logged-in identity. Shows nothing when logged-out.

### auth-sigil

![](https://i.imgur.com/xwa8DwY.png)

```html
<auth-sigil hex="c9185ef07bc9f24ca856f2a178e59f85d0d53d22a14b26b434b58a22c9a872fb"></auth-sigil>
```

Take a hex-encoded id, and present to the user as a sigil.

If the user hovers over the sigil, the full thumbprint is shown in the tooltip.

If the user clicks the sigil, the full thumbprint is copied to the clipboard.

<br/>

## Logins are really about signing claims

#### Okay, so you have a user's `login`. Now what?
- The purpose of a login is to *sign claims* on the user's behalf.
- You can then send claims to your server, and verify them.

#### The purpose of a claim is to say *"on behalf of this user, my frontend says..."*
- "...they want to post this message"
- "...they want to change their avatar"
- "...they want to buy this microtransaction"
- *Stuff like that.*

#### Claims are secured cryptographically
- Claims contain cryptographic proof that they stem from a user's login.
- No attacker can forge a claim for somebody else's identity.

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

## Authlocal glossary
- **Keypair** — an ed25519 keypair
  - `.id` is the public key (64 character hex string)
  - `.secret` is the private key (64 character hex string)
- **Identity** — a keypair with a label string
- **Seed** — text snippet or `.seed` file that stores an identity
- **Nametag** — the public data associated with a user's identity
    - `.id` is the public key (64 character hex string)
    - `.label` is a nickname (max 32 character string)
- **Thumbprint** — easier-to-read version of an id
    - `thumbprint` => `dozmut.winpex.linner.forsep.KgisJ8Pdgey1HC4o8cG59NaLYSoRTiHfA`
    - `sigil` (first two words) => `dozmut.winpex`
    - `preview` (first four words) => `dozmut.winpex.linner.forsep`
    - `bulk` (second part) => `KgisJ8Pdgey1HC4o8cG59NaLYSoRTiHfA`
- **Login** — a login session
    - is private, should never leave the user's device
    - `.nametag` contains the identity's id and label
    - `.expiresAt` js time of the moment this login expires
    - `.isExpired()` returns true if the login is now expired
    - `.signClaim(options)` sign a claim
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
    - verified by `verifyClaim(options)`

<br/>

## Common code snippets

#### Thumbprint conversions
```ts
import {Thumbprint} from "@authlocal/authlocal"
```
- **id to thumbprint**
    ```ts
    Thumbprint.fromHex("005636bab2c73223ccf56f8112432212f57f01ef61452762cd142acd61ed44ed")
      // "dozmut.winpex.linner.forsep.KgisJ8Pdgey1HC4o8cG59NaLYSoRTiHfA"
    ```
- **id to sigil**
    ```ts
    Thumbprint.sigil.fromHex("005636bab2c73223ccf56f8112432212f57f01ef61452762cd142acd61ed44ed")
      // "dozmut.winpex"
    ```
- **thumbprint to id**
    ```ts
    Thumbprint.toHex("dozmut.winpex.linner.forsep.KgisJ8Pdgey1HC4o8cG59NaLYSoRTiHfA")
      // "005636bab2c73223ccf56f8112432212f57f01ef61452762cd142acd61ed44ed"
    ```

<br/>

## Authlocal seed text format
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

When you sell a service or digital goods to a user's Authlocal identity, you should have a recovery mechanism, or people will get cranky.

<br/>

## 💖 [Authlocal](https://authlocal.org/) is free and open source
- Authlocal is an https://e280.org/ project.
- Open github issues or discussions if you have any questions.
- Like the project? Star it on github, it's the only way we're paid.

