
# 🔒 [Authlocal.org](https://authlocal.org/) User Guide
> ***Want it for your website?*** See the [Developer Readme](README.md) instead.

🔑 **Cryptographic** – no emails, no passwords  
🗽 **User-sovereign** – users own their identity, no databases  
🥷 **Privacy-focused** – not collecting data  
🥞 **Easy as pancakes** – logins are fast and painless for users  
💖 **Free and open-source** – zero cost at worldwide scale  

<br/>

## [Authlocal.org](https://authlocal.org/) Frequently Asked Questions

### Zero-cost at worldwide scale? How is it technically possible!?
- [Authlocal.org](https://authlocal.org/) is a 100% static http deployment. Dirt cheap to host.
- No api servers or microservices or anything like that.
- It's a clientside app, where users manage identities, and it operates via clientside postMessage.
- And it's open source, which means GitHub Pages is willing to host it for free.

### Who are we really trusting with the user's identity keys?
- Your web browser.
- GitHub and GitHub Pages, which hosts the source and app for free.
- Authlocal maintainers: https://github.com/authlocal/
  - [Chase Moskal](https://github.com/chase-moskal/), creator. Victoria BC, Canada. He says:  
    > *On pain of death, I swear Authlocal will always be free, open, user-sovereign, and privacy-focused.*
- The maintainers of the [package.json](package.json) dependencies:
  - [`@noble/ed25519`](https://github.com/paulmillr/noble-ed25519) by [Paul Miller](https://github.com/paulmillr)
  - [`@e280`](https://github.com/orgs/e280) by [Chase Moskal](https://github.com/chase-moskal/) and [Przemysław Gałęzki](https://github.com/zenkyuv)
  - [`@benev`](https://github.com/benevolent-games) by [Chase Moskal](https://github.com/chase-moskal/) and [Lonnie Ralfs](https://github.com/lonnie-ralfs/)

