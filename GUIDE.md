
# 🔒 [Authlocal.org](https://authlocal.org/) User Guide
> ***For devs,*** see also the [Developer Readme](README.md) instead.

🔑 **Cryptographic** – no emails, no passwords  
🗽 **User-sovereign** – users own their identity  
🥷 **Privacy-focused** – no databases, not collecting data  
🥞 **Easy as pancakes** – logins are fast and painless for users  
💖 **Free and open-source** – zero-cost at worldwide scale  

<br/>

## 🤔 Authlocal FAQ

### What if I lose my identity file or seed?
- Then it's gone. You'll have to generate a new identity.
- Responsible app devs selling goods to Authlocal IDs will provide a recovery mechanism, to relink your new ID.

### How do I recover my identity from a seed?
- Go to https://authlocal.org/ and click the `Import` button.
- This is also how you move identities between your devices.

### What does "Persistence off" mean?
- It means your browser might delete your identities from authlocal.org any time.
- Conversely, "Persistence on" means the browser is making a pinky-swear to keep your identities safe.
- If you click "Persistence off", Authlocal will request it. Firefox will nicely ask your permission. Chrome and Safari will usually ignore it.
- On Safari, with persistence off, there is a 7-day inactive data deletion policy. Apple users sometimes have to re-import their identities.

### Zero-cost at worldwide scale? How is it technically possible!?
- [Authlocal.org](https://authlocal.org/) is a 100% static http deployment. Dirt cheap to host.
- No api servers or microservices or anything like that. It runs clientside, using postMessage.
- And it's open source, which means GitHub Pages is willing to host it for free.

### Who am I really trusting with my identity keys?
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

