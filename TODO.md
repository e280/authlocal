
# authlocal todo 2
- [ ] seeds should have checksum
- [ ] downloads should use createObjectURL to conceal the sensitive base64 data from tooltips

# authlocal todo
- [ ] consider adding a dedicated "edit passport" flow -- instead of logging in, you jump straight to editing and re-logging-in
- [ ] authlocal.org third-party branding (apps can supply some kinda branding, at least their name, maybe a logo image)
- [ ] improved story about how the ui behaves when tokens expire
- [ ] improved ui for mobile devices
- [ ] users (not devs) can choose how long to authorize an app (1-hour, 24-hours, 7-days)
- [ ] story for third-party integration of opt-in services appearing on the authlocal.org app
- [ ] "nuclear wipe all" delete button for deleting multiple passports at once
- [x] rethink questionable Claim.decode pattern -- decoding a claim requires the proof, like what even?
- [x] story for versioning between downstream apps and the federated page on authlocal.org
  - done, added v1 namespaces on both sides of the api
- [x] (wontfix) users can choose emoji as avatars
  - nah, because each application wants its own avatar system, users can insert an emoji into their username
- [x] (wontfix) de-asyncify toData/fromData, so serialization/deserialization is seamless?
  - nah, it's of no benefit, since there's no reason to fromData unless you want the live keys

