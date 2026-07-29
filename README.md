
![](https://i.imgur.com/Of61sXO.png)

# 🔐 https://authlocal.org/

**any website can ask you to sign-in via authlocal.**  
manage identities on your device any time at [authlocal.org](https://authlocal.org/)  

&nbsp; 🔑 **cryptographic.** passwordless, emailless, provable.  
&nbsp; 🗽 **user-sovereign.** copy your keys as you wish.  
&nbsp; 🏡 **local-only.** keys live on your device.  
&nbsp; 🥷 **pseudonymous.** stable identity across apps.  
&nbsp; ✍️ **artisanal.** thoughtfully handcrafted by a human.  
&nbsp; 💖 **free and open-source.** protocol, not product.  

**own your identity.**  
your identity begins with a permanent seed key. don't lose it. don't share it. it's yours, forever.

**websites never see your seed key.**  
when you sign into a website with authlocal, that website receives cryptographic proof of the identity you selected.

> *"keep it secret. keep it safe."*  
> &nbsp; &nbsp; *— gandalf, fellowship of the ring*



<br/><br/>

## 🔐 installation for web developers
> *visit https://authlocal.org/demo/ to see what the authlocal popup looks like.*

### 🍋‍🟩 basic logins for your website
1. **install and import `@e280/authlocal`.**
    ```bash
    npm install @e280/authlocal
    ```
    ```ts
    import {Auth} from "@e280/authlocal"
    ```
1. **create the auth facility.** *(see [auth.ts](./s/lib/protocol/auth.ts))*
    > *see options at [default-auth-options.ts](./s/lib/protocol/parts/default-auth-options.ts)*
    ```ts
    const auth = new Auth()
    ```
1. **react to user session changes.** *(see [user.ts](./s/lib/protocol/user.ts))*  
    > *`auth.user` is also compatible with [@e280/strata](https://github.com/e280/strata) effects.*
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
1. **perform a login flow with authlocal.** *(call from a button click)*
    ```ts
    await auth.loginViaPopup()
    ```
1. **logout immediately.**
    ```ts
    await auth.logout()
    ```

### 🍋‍🟩 perform end-to-end encryption for the user
- **encrypt.**
    ```ts
    const ciphertext = user.encrypt(
      new Uint8Array([0xDE, 0xAD, 0xBE, 0xEF])
    )
    ```
- **decrypt.**
    ```ts
    const cleartext = user.decrypt(ciphertext)
    ```

### 🍋‍🟩 sign and verify claims for the user
- **sign a claim token containing any data you like.**  
    > *you can pass [options.ts](./s/lib/core/alco/claim/types/options.ts) as 2nd param.*
    ```ts
    const token = user.signClaim({myAction: "getMyInfo"})
    ```
- **verify a claim token serverside or elsewhere.** *(note the import path)*  
    > *see more options in [claim/verifications.ts](./s/lib/core/alco/claim/types/verifications.ts).*
    ```ts
    import {verifyClaim, address} from "@e280/authlocal/core"

    // we verify that the data was signed by a valid delegate
    const {claim, proof} = verifyClaim(token, {

      // your frontend app origin (required)
      allowedIssuers: ["https://app.e280.org"],
    })

    console.log(claim)
      // {myAction: "getMyInfo"}

    console.log(proof.id) // user id
      // "efe064a4ed1ec1763293612627424c0721b82acd009fc666e6915d8edcfe89e6"

    console.log(address(proof.id))
      // "calwak_curlex_H9Nts5YRurzidb8mQHkHH323mMT8d3oReimRzxeLgwRw"
    ```

### 🍋‍🟩 use `address` for friendly names
- **`address(id)`** -- encode a user id into a friendly format.
    ```ts
    import {address} from "@e280/authlocal"

    address("efe064a4ed1ec1763293612627424c0721b82acd009fc666e6915d8edcfe89e6")
      // "calwak_curlex_H9Nts5YRurzidb8mQHkHH323mMT8d3oReimRzxeLgwRw"
    ```
- **`addressId(addr)`** -- decode an address back into a user id.
- **`addressEmoji(id)`** -- derive a friendly emoji from a user id.
- **`addressColor(id)`** -- derive a css color string from a user id.
- **`addressMoniker(id)`** -- get the first part of the address.



<br/><br/>

## 🔐 questions and answers

### 🫐 what's really going on under the hood?
- your site opens a popup to authlocal and asks for "delegates", which are signed by the user identity's secret key.
- a delegate is a new keypair that comes with a "proof" token which proves that the delegate was signed by the user secret. a delegate can sign new "claim" tokens on behalf of the user, which have a verifiable chain-of-custody back to the user secret.
- in a standard login flow, your site asks for two delegates: one ephemeral "auth" delegate that expires in 30 days, and one stable "crypt" delegate for end-to-end encryption. the "auth" delegate can be used to sign new claims for any data or request *(eg, "i am user abc123 and i want to write data to the server"),* which your server can verify.

### 🫐 why not passkeys or pairwise?
- we believe users *want* a simple "just works" experience where they have a stable identity across apps.
- we want devs to weave an ecosystem of interoperable apps and services, eg, a messenger service that interoperates with a friends-list service, etc, without annoying account-linking flows.
- passkeys are inherently pairwise and hostile to these goals.
- we let users decide whether they want to share an identity across apps, or not -- that's why they can create multiple identities.



<br/><br/>

*https://e280.org/*

