# Phylocanvas 3 development guide

## Top-level commands

```
yarn start [page]
```

Start a development build, with optional testing page. `page` should match a folder in `./dev/pages`.

```
yarn build [--scope=@cgps/phylocanvas-plugin-name]
```

Runs yarn build inside each package, can be optionally scoped using the full package name, i.e. not the directory name.

```
yarn run link
```

Links every package globally.

## Publishing a new version

1.  Run a new build (see above) and commit it.

2.  Login to npm

3.  Run `yarn release`.

[for beta releases, choose "Custom Version" and enter "3.0.0-beta.{number}"]
