
![](https://i.imgur.com/Ao6piCO.png)

# 🔒 Authlocal

### 👉 https://authlocal.org/ 👈

**Authlocal is a free login system for the web.**  
Any website you visit can request your login from an Authlocal popup, but your identity seed files stay safely local on your own device. You can go to the [authlocal.org](https://authlocal.org/) website any time to manage all your identities.

- 🗽 **User-sovereign** – hold your own identity seed files  
- 🔑 **Cryptographic** – no emails, no passwords  
- 🥷 **Privacy-focused** – pseudonymous, device-local, no databases  
- 💖 **Free and open-source** – zero-cost at global scale  

**Own your identity.**  
When you create an identity, download the seed and keep it safe. The seed *is* the identity. Don't lose it. Don't share it. Never give your seed to another person or website. It's yours, forever.



<br/><br/>

## 📖 Integration Manual for Web Developers

**Authlocal empowers your app with:**
- 👤 **Logins** — let users authenticate themselves via authlocal popup *(ids are ed25519 pubkeys)*
- ✍️ **Claims** — let users sign verifiable arbitrary claims *(ed25519 tokens)*
- 🔐 **Cryption** — let users encrypt and decrypt their own data *(symmetric aes-gcm)*
- 🛰️ **Comms** — let users open end-to-end-encryption channels with other users *(x25519 shared secrets)*

### Install Authlocal logins into your web app
1. **Install authlocal and friends via npm**
    ```sh
    npm install @e280/authlocal @e280/stz
    ```
1. **Javascript to install Authlocal on your page**  
    ```js
    import * as authlocal from "@e280/authlocal"

    const {auth} = await authlocal.install({
      theme: authlocal.themes.basic,
    })

    auth.on(login => {
      if (login) console.log("logged in", login)
      else console.log("logged out")
    })
    ```
1. **Put these web components in your html `<body>`**  
    ```html
    <auth-user></auth-user>
    <auth-button></auth-button>
    ```
1. **Take it for a spin!**  
    You should be able to login and logout via Authlocal.  

### Logins
- **Never send the login info anywhere.** Send claims instead!
- Logins are auto persisted in localStorage for 7 days
- Anatomy of a `login` object:
  - `login.sessionId` — id of the login session hex string
  - `login.nametag.id` — user identity public key hex string
  - `login.nametag.label` — user's chosen nickname
  - `login.expiresAt` — js timestamp of when this login expires
  - `login.isExpired()` — returns true if the login is expired now
  - `login.signClaim(options)` — sign a claim on behalf of this user
  - `login.encrypt(data)` — encrypt data for this user
  - `login.decrypt(data)` — decrypt data for this user

### Claims
A login can sign claims on the user's behalf. You can then send those claims to your server and verify them there. A claim contains a cryptographic proof that it stems from a genuine login session signed by the user's seed.

Spritually, a claim is trying to say something like *"This user gave my app permission to speak on their behalf:"*
- *"we want to post this message..."*
- *"we want to change their avatar..."*
- *"we want to buy this microtransaction..."*

#### Sign a claim with a login, on the frontend
```ts
import {time} from "@e280/stz"

const claimToken = await login.signClaim({

  // any json-friendly data you want
  claim: {message: "i love ice cream"},

  // when should this claim expire?
  expiresAt: time.future.hours(24),
})
```

#### Verify a claim, on the server
```ts
import {verifyClaim} from "@e280/authlocal/core"

const {claim, proof} = await verifyClaim({
  claimToken,
  appOrigins: ["https://e280.org"],
    //                   |
    //    your website origin goes here
})
```
```ts
proof.sessionId
  // id for this login session, looks like:
  // "ff730fe2d725aa5210152975212d1068d7fe28ae22b5e62337a4cde42215187a"
```
```ts
proof.nametag.id
  // user identity id, looks like:
  // "a08263e70a0a48a07e988a7c0931ada6b0a38fa84bf367087b810c614a4c2070"
```
```ts
proof.nametag.label
  // user identity nickname, looks like:
  // "Michael Scott"
```

### Comms: end-to-end encrypted channels
- you can spawn an authlocal popup requesting to open a secure comms channel to another user like this
    ```ts
    const comms = await auth.popupComms({

      // the known local user
      aliceId: "96895ecdd982da7ea84f32b886940f08cc7e87d892916216e1f0a7c46436d304",

      // any remote authlocal id
      bobId: "74fc036d91656caa699549e82a8949713adb654421036fe494ade26ca87f870e",

      // optional salt for creating different channels
      salt: "",
    })

    console.log(comms?.secret)
    ```
    - `comms` is null if the user denied the request or closed the popup
    - `comms.secret` will be a hex secret key if successful
- the resulting `comms.secret` is a shared key
    - if we flip roles, swapping alice and bob's ids, we will get the same key either way
    - thus, both alice and bob can derive the same cryption key between each other, totally offline
    - thus either party can open this same secure comms channel — all they need are each other's ids

### Thumbprint
- **`thumbprint` is an `@e280/stz` tool for visualizing 64-char ids**
    ```ts
    import {thumbprint} from "@e280/stz"
    ```
- **id to full thumbprint**
    ```ts
    thumbprint.fromHex("005636bab2c73223ccf56f8112432212f57f01ef61452762cd142acd61ed44ed")
      // "dozmut.winpex.linner.forsep.KgisJ8Pdgey1HC4o8cG59NaLYSoRTiHfA"
    ```
- **id to short sigil**
    ```ts
    thumbprint.sigil.fromHex("005636bab2c73223ccf56f8112432212f57f01ef61452762cd142acd61ed44ed")
      // "dozmut.winpex"
    ```
- **thumbprint to id**
    ```ts
    thumbprint.toHex("dozmut.winpex.linner.forsep.KgisJ8Pdgey1HC4o8cG59NaLYSoRTiHfA")
      // "005636bab2c73223ccf56f8112432212f57f01ef61452762cd142acd61ed44ed"
    ```

### Authlocal dev glossary
- **Authority** — the website that provides login sessions (authlocal.org)
  - `authorityOrigin` is the provider's origin, eg `https://authlocal.org`
- **App** — the third party website receiving login sessions (your website)
  - `appOrigin` is your app origin, eg `https://e280.org`
- **Keypair** — an ed25519 keypair
  - `.id` is the public key (64 character hex string)
  - `.secret` is the private key (64 character hex string)
- **Identity** — a keypair with a label string
- **Nametag** — the public data associated with a user's identity
    - `.id` is the public key (64 character hex string)
    - `.label` is a nickname (max 32 character string)
- **Seed** — text snippet or `.seed` file that stores an identity
- **Thumbprint** — easier-to-read version of an id
    - `thumbprint` => `dozmut.winpex.linner.forsep.KgisJ8Pdgey1HC4o8cG59NaLYSoRTiHfA`
    - `sigil` (first two words) => `dozmut.winpex`
    - `preview` (first four words) => `dozmut.winpex.linner.forsep`
    - `bulk` (last part) => `KgisJ8Pdgey1HC4o8cG59NaLYSoRTiHfA`
- **Login** — a login session
    - is private, should never leave the user's device
    - `.nametag` contains the identity's id and label
    - `.expiresAt` js time of the moment this login expires
    - `.isExpired()` returns true if the login is now expired
    - `.signClaim(options)` sign a claim
    - `.encrypt(data)` encrypt data for this user
    - `.decrypt(data)` decrypt data for this user
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



<br/><br/>

## 🧑‍💻 Authlocal is an [e280](https://e280.org/) project
Open github issues or discussions if you have any questions.  
Star us on github, it's the only way we're paid.  
Free and open source.  

