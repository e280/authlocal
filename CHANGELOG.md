
# `@e280/authlocal` changelog
- 🟥 breaking change
- 🔶 deprecation or possible breaking change
- 🍏 harmless addition, fix, or enhancement



<br/><br/>

## v0.3

### v0.3.5
- 🍏 fix login popup kb accessibility
- 🍏 tweak auth widget layout

### v0.3.4
- 🍏 add stable scrollbar gutters on authlocal.org

### v0.3.3
- 🍏 fix auth-widget emoji icon layout and scaling

### v0.3.2
- 🍏 allow login popup on pages that have `window.crossOriginIsolated` to support pages with document isolation policy

### v0.3.1
- 🍏 fix firefox auth state sync across windows, by adding a 100ms `consts.broadcastReloadDelay`

### v0.3.0
- 🟥 total rewrite. everything's changed.



<br/><br/>

## v0.2

### v0.2.0-37
- 🟥 fix app component themes, tweak vars and layout

### v0.2.0-36
- 🟥 rework installation
- 🟥 rework how themes work (supplied as auth option)


### v0.2.0-34
- 🍏 totally rewrite new `README.md`, which replaces the old one and the old `GUIDE.md` too
- 🍏 fix web component rendering bug by upgrading `@e280/sly`

### v0.2.0-33
- 🔶 upgrade from `@benev/slate` to `@e280/sly`+`@e280/strata`
- 🟥 remove <auth-button> and <auth-user> js element instance properties like `.auth` and `.on`
  - now these are only accessible via the `auth` object they're installed with

### v0.2.0-32
- 🍏 update dependencies

### v0.2.0-31
- 🟥 remove `Time` util (moved to `@e280/stz`)

### v0.2.0-30
- 🍏 update dependencies

### v0.2.0-29
- 🔶 remove wildcard package exports (formalized exports only)
- 🍏 update dependencies

### v0.2.0-28
- 🟥 massive full rewrite. everything's changed. no users yet.

