
# 🔒 [Authlocal.org](https://authlocal.org/) User Guide
> ***Developers,*** also see the [README.md](README.md)

🗽 **User-sovereign** – you own your identity  
🔑 **Cryptographic** – no emails, no passwords  
🥷 **Privacy-focused** – no databases, not collecting data  
🥞 **Easy as pancakes** – logins are fast and painless  
💖 **Free and open-source** – zero-cost at global scale  

**[Authlocal.org](https://authlocal.org/)** is an app where you can manage your digital identities.

Any website can spawn a popup asking for you to login via Authlocal. Your identities are based on a cryptographic seed, which Authlocal will *never* share with any website. Your identity seeds are between you and Authlocal only. Third-party websites may requesting a *login session* via Authlocal, but they should never ask for your identity seed.

<br/>

## 🤔 Authlocal FAQ

### What if I lose my identity file or seed?
- It's gone. Generate a new one.
- The app you're using should provide a recovery mechanism for anything important.

### How do I recover my identity from a seed?
- Go to https://authlocal.org/ and click the `Import` button. You can upload a seed file, or paste one in.
- This is also how you move identities between your devices.

### What if some other website asks for my seed?
- It's a scam! Never share your seed with anybody or anywhere except https://authlocal.org/

### What's with the weird names like "`narnyl.tabtyd`"?
- That's an identity's permanent *sigil*. It's a preview of the full cryptographic thumbprint.
- Names are just labels. A hundred people could call themselves "`Steve`".
- Every identity also has a permanent unique cryptographic thumbprint.
  - Thumbprint: "`narnyl.tabtyd::2BFH296SFgeKP4VA2uoYjiDRj43JxgGg58AYgwN`"
  - There are more possible thumbprints than atoms in the galaxy (256 bits). No two people will have the same thumbprint.
- The *sigil* is just the first four bytes of the thumbprint. We display it to help you differentiate who's *really* who.
  - Sigil: "`narnyl.tabtyd`"
  - There are 4.2 billion possible sigils. Rarely, two people could have the same fingerprint, so check the full thumbprint if you're suspicious.

### What does "Persistence off" mean?
- You may see this in the footer of [authlocal.org](https://authlocal.org/).
- It means your browser might delete your identities from authlocal.org any time.
- Conversely, "Persistence on" means the browser pinky-swears to keep your identities safe.
- If you click "Persistence off", Authlocal will request persistence. Firefox will nicely ask your permission. Chrome and Safari will usually ignore you.
- On Safari, with persistence off, there is a 7-day inactive data deletion policy. Apple users often need to re-import their identities.

### Zero-cost at global scale? How is it technically possible!?
- [Authlocal.org](https://authlocal.org/) is a static http deployment. Dirt cheap hosting.
- No api servers or microservices. Runs clientside, using postMessage.
- It's open source, so GitHub Pages is willing to host it for free.

### Who am I really trusting with my identity seeds?
- Yourself.
- Your web browser, operating system, and hardware.
- GitHub and GitHub Pages, which hosts the source and app for free.
- Authlocal maintainers: https://github.com/authlocal/
  - [Chase Moskal](https://github.com/chase-moskal/), creator. Victoria BC, Canada. He says:  
    > *On pain of death, I swear Authlocal will always be free, open, user-sovereign, and privacy-focused.*
- Dependency maintainers:
  - [`@noble/ed25519`](https://github.com/paulmillr/noble-ed25519) — [Paul Miller](https://github.com/paulmillr)
  - [`@e280`](https://github.com/orgs/e280) — [Chase Moskal](https://github.com/chase-moskal/), [Przemysław Gałęzki](https://github.com/zenkyuv)
  - [`@benev`](https://github.com/benevolent-games) — [Chase Moskal](https://github.com/chase-moskal/), [Lonnie Ralfs](https://github.com/lonnie-ralfs/)

<br/>

## 💖 Authlocal is free and open source

My name is Chase Moskal, and I built Authlocal to power [benevolent.games](http://benevolent.games/).

Got questions or feedback? Don't hesitate to open a github issue or discussion anytime.

Like the project? Star it on github, it's the only way I'm paid.

