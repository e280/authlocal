
![](https://i.imgur.com/Ao6piCO.png)

# 🔒 [authlocal.org](https://authlocal.org/)

**authlocal is a free login system.**  
any website can ask for you to sign-in via authlocal.  
manage your identities any time at https://authlocal.org/  

- 🗽 **user-sovereign** – keep your own identity root keys  
- 🏡 **local storage** – keys stay in your browser, not a server  
- 🔑 **cryptographic** – no emails, no passwords  
- 🥷 **privacy-focused** – unique ids for each site, no tracking  
- 💖 **free and open-source** – zero-cost at global scale  

**own your identity.**  
each identity you create has a permanent *"root key"* — don't lose it — don't share it — it's yours, forever.

> *"keep it secret. keep it safe."*  
> &nbsp; &nbsp; *— gandalf, fellowship of the ring*

<br/><br/>

## authlocal for developers

### glossary

#### cryp terms
- **Hex** — a 64-character hexadecimal string  
- **Id** — an ed25519 public Hex key  
- **Secret** — a private Hex key  
- **Root** — the core Secret for an identity, keep it safe!  
- **Scope** — a string used to deterministically derive a new Secret from another Secret  

#### alco terms
- **Viceroy** — a Secret derived from the root, scoped to a particular app origin  
- **Delegate** — contains a scoped Secret derived from a Viceroy, and a signed Proof  
- **Petition** — a request describing the scope and expiry for a Delegate  
- **Testimony** — token signed by a Viceroy  
- **Proof** — Testimony that proves a Viceroy signed a Delegate  
- **Issuer** — the origin that is issuing delegates (ie, `https://authlocal.org`)  
- **Audience** — the origin that requests delegates (ie, `https://e280.org`)  

#### nomen terms
- **Acorn** — human-friendly text that encodes a Root  
    ```
    yenzud borbob kemkog remjox
    pulfek coltyr matkyr zorfur
    bobrek wabmur pobbob wemlur
    korwyd lidfek gorvok kiddok
    fabraz
    ```
- **Moniker** — human-friendly text that encodes an Id  
    ```
    _wixzad_tobwyk_qkqwi2doLnmVrCKY2gib8v22aAimZNpuw1Y3Nvd1z
    ```
- **Sigil** — first part of the moniker  
    ```
    _wixzad_tobwyk
    ```

