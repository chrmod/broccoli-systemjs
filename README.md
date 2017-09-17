# broccoli-systemjs

[Broccoli](https://github.com/broccolijs/broccoli) addon that bundles JavaScript with help of [SystemJS Builder](https://github.com/systemjs/builder).

## Usage

Typical to Broccoli addons it takes a tree as first argument and options object as a second.

```js
import SystemJSBuilder from 'broccoli-systemjs';

export default SystemJSBuilder('src', {
  systemConfig: {
    // put SystemJS loader config here
  },
  builderConfig: {
    // put SystemJS builder config here
  },
});
```

Options consist of:
* `systemConfig` - [SystemJS Config](https://github.com/systemjs/systemjs/blob/master/docs/config-api.md)
* `builderConfig` - SystemJS [Builder bundle config](https://github.com/systemjs/builder/blob/master/docs/api.md#builderbundletree-outfile-options)
* `annotation` for Broccoli tree

The addon will automatically scan for all files that ends with `*.bundle.js` and will build static (self executable) bundles for them.

## Notes

This addons is pretty much hand tailored for [Cliqz Browser Core](https://github.com/cliqz-oss/browser-core) build pipeline, but should be usable in any other setup. If you are interested in using it, please file a github issue for support.

Compared to other SystemJS broccoli addons, this one is:
* compatible with Broccoli 1.x
* limited to static bundling
* simpler to use (no SystemJS config file required in a tree)

## Development

This addon is built with help of [raureif](https://github.com/chrmod/raureif).
Install raureif with:

```
npm install -g raureif
```

and build project with:

```
raureif build
```

For more info check raureif readme.
