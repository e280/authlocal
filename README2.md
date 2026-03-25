
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

#### how authlocal works
- authlocal.org is the first delegator implementing the protocol
- any website can act as a petitioner, and send petitions to the delegator
- the delegator may respond with delegates
- each delegate is a keypair derived from the user's root, scoped to the petitioner, and can:
  - act as a login session
  - sign id tokens
  - be used for end-to-end encryption

### glossary

#### cryp terms
- **Hex** — a 64-character hexadecimal string  
- **Id** — an ed25519 public Hex key  
- **Secret** — a private Hex key  
- **Root** — the core Secret for an identity, keep it safe!  
- **Scope** — a string used to deterministically derive a new Secret from another Secret  

#### alco terms
- **Delegator** — the origin that is issuing delegates (ie, `https://authlocal.org`)  
- **Petitioner** — the origin that sends petitions (ie, `https://e280.org`)  
- **Petition** — a request describing the scope and expiry for a Delegate  
- **Venue** — contains the Delegator and Petitioner needed to sign a Delegate  
- **Viceroy** — a Secret derived from the Root, scoped to a particular Petitioner  
- **Delegate** — contains a scoped Secret derived from a Viceroy, and a signed Proof  
- **Testimony** — token signed by a Viceroy  
- **Proof** — Testimony that proves a Viceroy signed a Delegate  

#### ergo terms
- **Seed** — human-friendly text that encodes a Root  
    ```
    molrad tobpyx
    folryd fidvyn pordax mabtur
    tulrok curmux pidpex kamyak
    rumhur minlyx mornod nindex
    borbur wolkar bodlan binkak
    ```
- **Nomen** — human-friendly text that encodes an Id  
    ```
    molrad_tobpyx_aFHY73ALGfPbwvQUTdYLCSzr29KPosbY24YV3KfJw
    ```
- **Nom** — just the first parts of the Nomen  
    ```
    molrad_tobpyx
    ```
- **Sigil** — visual glyph svg representing an Id  

