
![](https://i.imgur.com/Of61sXO.png)

# 🔐 https://authlocal.org/

**any website can ask you to sign-in with authlocal.**  
manage identities on your device any time at [authlocal.org](https://authlocal.org/).  

&nbsp; 🔑 **cryptographic.** passwordless, emailless, provable.  
&nbsp; 🗽 **user-sovereign.** copy your keys as you wish.  
&nbsp; 🏡 **local-only.** fully clientside, keys live on your device.  
&nbsp; 🥷 **pseudonymous.** no need for personal information.  
&nbsp; 💖 **free and open-source.** protocol, not product.  

**own your identity.**  
each identity is recoverable from a permanent seed code.  
don't lose it. don't share it. it's yours, *forever.*  

**websites never see your seed code.**  
they only see crypto-proof of the identity you selected.  

> *"keep it secret. keep it safe."*  
> &nbsp; &nbsp; *— gandalf, fellowship of the ring*



<br/><br/>

## 🔐 installation for web developers
> *see the https://authlocal.org/demo/*

### 🍋‍🟩 basic logins for your website
1. **install and import `@e280/authlocal`.**
    ```bash
    npm install @e280/authlocal
    ```
    ```ts
    import {Auth} from "@e280/authlocal"
    ```
1. **create the auth facility.**
    > *see [auth.ts](./s/lib/protocol/auth.ts).*  
    > *see [default-auth-options.ts](./s/lib/protocol/parts/default-auth-options.ts).*  
    ```ts
    const auth = new Auth()
    ```
1. **react to user session changes.**
    > *see [user.ts](./s/lib/protocol/user.ts).*  
    > *`auth.user` is compatible with [@e280/strata](https://github.com/e280/strata).*  
    ```ts
    auth.on(user => console.log(
      user
        ? `logged in: ${user.id}`
        : `logged out`
    ))
    ```
1. **start by remembering a previous user session.**
    ```ts
    await auth.remember()
    ```
1. **perform a login flow with authlocal.**
    > *call this from a button click, or you'll get popup blocked.*  
    > *see [session-options.ts](./s/lib/protocol/types/session-options.ts).*  
    ```ts
    await auth.loginViaPopup()
    ```
1. **logout immediately.**
    ```ts
    await auth.logout()
    ```

### 🍋‍🟩 web components
- **the widget has a little login/logout ux, if you like.**
    > *it's the widget you see at https://authlocal.org/demo/*  
    > *[@e280/sly](https://github.com/e280/sly) view exported as `Widget`.*  
    ```ts
    import {makeAuthWidget} from "@e280/authlocal"

    customElements.define("auth-widget", makeAuthWidget(auth))
    ```
    then you put this html on your page:
    ```html
    <auth-widget>Sign in</auth-widget>
    ```

### 🍋‍🟩 end-to-end encryption for the user
- **[encrypt.ts](./s/lib/core/cryp/encrypt.ts)**
    ```ts
    const original = new Uint8Array([0xDE, 0xAD, 0xBE, 0xEF])
    ```
    ```ts
    const ciphertext = user.encrypt(original)
    ```
- **[decrypt.ts](./s/lib/core/cryp/decrypt.ts)**
    ```ts
    const cleartext = user.decrypt(ciphertext)
    ```

### 🍋‍🟩 sign and verify claims for the user
- **sign a claim token, containing any data you like.**
    > *see [options.ts](./s/lib/core/alco/claim/types/options.ts).*
    ```ts
    const token = user.signClaim({myAction: "getMyInfo"})
    ```
- **verify a claim token, on your server or elsewhere.** *(note the import path)*
    > *see [claim/verifications.ts](./s/lib/core/alco/claim/types/verifications.ts).*
    ```ts
    import {verifyClaim} from "@e280/authlocal/core"

    // we verify that the data was signed by a valid delegate
    const {claim, proof} = verifyClaim(token, {

      // your frontend app origin (required)
      allowedIssuers: ["https://app.e280.org"],
    })

    console.log(claim)
      // {myAction: "getMyInfo"}

    console.log(proof.id) // user id
      // "efe064a4ed1ec1763293612627424c0721b82acd009fc666e6915d8edcfe89e6"
    ```

### 🍋‍🟩 `address` for friendly names
- **`address(id)`** -- encode a user id hex into a friendly format.
    ```ts
    import {address} from "@e280/authlocal"
    ```
    ```ts
    address("efe064a4ed1ec1763293612627424c0721b82acd009fc666e6915d8edcfe89e6")
      // "calwak_curlex_H9Nts5YRurzidb8mQHkHH323mMT8d3oReimRzxeLgwRw"
    ```
- **`addressId(addr)`** -- decode an address back into a user id.
- **`addressEmoji(id)`** -- derive a friendly emoji from a user id.
- **`addressColor(id)`** -- derive a css color string from a user id.
- **`addressMoniker(id)`** -- get the first part of the address.

### 🍋‍🟩 mocks for testing
- **produce a mock auth facility that generates a random fake user.**
    ```ts
    import {MockAuth, mockUser, mockOrigin} from "@e280/authlocal"
    ```
    ```ts
    const auth = new MockAuth()
    await auth.loginViaPopup()
    ```
    - `MockAuth` doesn't touch localstorage etc.
    - `mockUser` generates a fake user.
    - `mockOrigin` is the string `"https://e280.org"`.



<br/><br/>

## 🔐 questions and answers

### 🫐 how local is authlocal?
- https://authlocal.org/ is a fully-static clientside single-page application that operates without any remote services or databases.
- despite being totally clientside, authlocal acts as a federated identity provider for third-party websites, communicating cross-origin via popup postmessage api.

### 🫐 what's really going on, cryptographically?
- authlocal depends on paul miller's [noble cryptography libraries](https://paulmillr.com/noble/).
- every authlocal identity is an ed25519 keypair. we call the private key a `secret`, and the public key an `id`.
- third-party websites open a popup to authlocal and ask for "delegates", which are ed25519 keypairs derived from the user's secret key (and also bound to the app origin and provided purpose and scope).
- a delegate comes with a "proof" token signed by the user secret, which includes the user id and proves that the delegate is legitimate.
- a delegate can sign new "claim" tokens on behalf of the user, which include the proof token, and thus have a verifiable chain-of-custody back to the user. claims can contain any arbitrary data *(such as a request like "read my private profile"),* which a third-party server can verify.
- in the default standard login flow, websites ask for two delegates: one ephemeral "auth" delegate that expires in 30 days, and one stable "crypt" delegate with a secret for end-to-end encryption.

### 🫐 why not passkeys?
- unlike passkeys, authlocal lets you see your seed. you can put it on paper.
- passkeys have a pairwise design with separate credentials for each app. instead, authlocal lets users carry a stable identity across apps. it's a tradeoff.
- in the future, authlocal might use passkeys as another way to recover identities.



<br/><br/>

*https://e280.org/*

