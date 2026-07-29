
![](https://i.imgur.com/Of61sXO.png)

# 🔐 [authlocal](https://authlocal.org/) is the user-sovereign login system.
any website can ask you to sign-in via authlocal.  
manage identities on your device any time at https://authlocal.org/  

&nbsp; 🔑 **cryptographic.** passwordless, emailless, provable.  
&nbsp; 🗽 **user-sovereign.** copy and store your keys however you wish.  
&nbsp; 🏡 **local-only.** app is 100% clientside. keys are on your device.  
&nbsp; 🥷 **pseudonymous.** seamlessly carry your identity across services.  
&nbsp; ✍️ **artisanal.** thoughtfully designed and coded by hand.  
&nbsp; 💖 **free and open-source.** a protocol, not a product. zero-cost at global scale.  

**own your identity.**  
your identity begins with a permanent seed key. don't lose it. don't share it. it's yours, forever.

> *"keep it secret. keep it safe."*  
> &nbsp; &nbsp; *— gandalf, fellowship of the ring*



<br/><br/>

## 🔐 installation for web developers
> *visit https://authlocal.org/demo/ to see what the authlocal popup looks like.*

### 🍋‍🟩 basic logins
1. **install and import `@e280/authlocal`.** *(and [`@e280/strata`](https://github.com/e280/strata) for this demo)*
    ```bash
    npm install @e280/authlocal @e280/strata
    ```
    ```ts
    import {Auth} from "@e280/authlocal"
    import {effect} from "@e280/strata"
    ```
1. **create the auth facility.** *(see [auth.ts](./s/lib/protocol/auth.ts))*
    ```ts
    const auth = new Auth()
    ```
1. **react to user session changes.** *(see [user.ts](./s/lib/protocol/user.ts))*
    ```ts
    effect(() => console.log(
      auth.user
        ? `logged in: ${auth.user.id}`
        : `logged out`
    ))
    ```
    - **user.id:** `"efe064a4ed1ec1763293612627424c0721b82acd009fc666e6915d8edcfe89e6"`  
        proper id you should identify users by. it's actually the ed25519 public key, as 64 hex characters.  
    - **user.alias:** `"Gandalf the Gray"`  
        customizable nickname.  
    - **user.cryptSecret:** `"8109ea0663cdf5da134f2a79f218ac2bcdd69750f2db5ceb02b85d066b28917d"`  
        stable end-to-end encryption key.  
    - **user.expiresAt:** `1785232580494`  
        js milliseconds time at which this session expires.  
    - **user.valid:** `true`  
        getter to check if this user session is currently valid.  
1. **start by remembering a previous user session.**
    ```ts
    await auth.remember()
    ```
1. **perform a login flow with authlocal.** *(call from a button click)*
    ```ts
    await auth.loginViaPopup()
    ```
1. **logout immediately.**
    ```ts
    await auth.logout()
    ```

### 🍋‍🟩 perform end-to-end encryption for the user
1. **encrypt.**
    ```ts
    const ciphertext = auth.user.encrypt(
      new Uint8Array([0xDE, 0xAD, 0xBE, 0xEF])
    )
    ```
1. **decrypt.**
    ```ts
    const cleartext = auth.user.decrypt(ciphertext)
    ```

### 🍋‍🟩 sign and verify testimonies on behalf of the user
1. **sign a testimony token.**
    ```ts
    const token = auth.user.signTestimony({exampleCommandToWriteData: 123})
    ```
    you can pass [testimony/options.ts](./s/lib/core/alco/testimony/options.ts) as 2nd param.
1. **verify a testimony token serverside or elsewhere.** *(note the import path)*
    ```ts
    import {verifyTestimony, address} from "@e280/authlocal/core"

    // we verify that the data was signed by a valid delegate
    const testimony = verifyTestimony(token, {

      // your frontend app origin (required)
      allowedIssuers: ["https://app.e280.org"],
    })

    console.log(testimony.data.exampleCommandToWriteData)
      // 123

    console.log(testimony.proof.id)
      // "cd967edd1a3a82e142faa5003eda67d167a2b5f76d0e97e8158defe59e2a2c89"

    console.log(address.from(testimony.proof.id))
      // "volrad_welsyx_EqXgGh7SEyGzpbUiacCJ7BVpAP1kBePt6THiR8gSTtGx"
    ```
    you can pass [testimony/verifications.ts](./s/lib/core/alco/testimony/verifications.ts) as 2nd param.

### 🍋‍🟩 `address` facility for friendly names
1. **import address facility.**
    ```ts
    import {address} from "@e280/authlocal"
    ```
    ```ts
    const id = "efe064a4ed1ec1763293612627424c0721b82acd009fc666e6915d8edcfe89e6"
      // for these examples
    ```
1. **address.from,** encode a user id into friendly address format.
    ```ts
    address.from(id)
      // "calwak_curlex_H9Nts5YRurzidb8mQHkHH323mMT8d3oReimRzxeLgwRw"
    ```
1. **address.id,** decode an address back into a user id.
    ```ts
    address.id("calwak_curlex_H9Nts5YRurzidb8mQHkHH323mMT8d3oReimRzxeLgwRw")
      // "efe064a4ed1ec1763293612627424c0721b82acd009fc666e6915d8edcfe89e6"
    ```
1. **address.emoji,** derive a friendly emoji from the user id.
    ```ts
    address.emoji(id)
      // "🐦"
    ```
1. **address.color,** derive a friendly color from the user id.
    ```ts
    address.color(id)
      // "oklch(0.8 0.03 136.94)"
    ```
1. **address.moniker,** just the first part of the address.
    ```ts
    address.moniker(id)
      // "calwak_curlex"
    ```

### 🍋‍🟩 what's really going on under the hood
- your site opens a popup to authlocal and asks for "delegates", which are signed by the user identity's root key. a delegate is a new keypair that comes with a "proof" token which proves that the delegate was signed by the user root. being a keypair in its own right, a delegate can then sign new "testimony" tokens on behalf of the user, which have a verifiable chain-of-custody back to the user root.
- in a standard login flow, your site asks for two delegates: one ephemeral "auth" delegate that expires in 30 days, and one permanent "crypt" delegate for end-to-end encryption. the "auth" delegate can be used to sign new testimonies for any data or request *(eg, "i am user abc123 and i want to write data to the server"),* which your server can verify.



<br/><br/>

*https://e280.org/*

