# chi-squared

Characteristic functions for the
[chi-squared distribution](http://en.wikipedia.org/wiki/Chi-squared_distribution).

> **This is a maintained fork of [chi-squared.js][upstream], published as
> [`@unabandoned/chi-squared`][pkg].** Upstream's last release was 1.1.0 in
> 2014. The implementation is unchanged; its one dependency, `gamma`, is
> vendored in-tree as `gamma.js`, so the package has no runtime dependencies.
> See [.unabandoned.yml](.unabandoned.yml).

[upstream]: https://github.com/dominictarr/chi-squared.js
[pkg]: https://www.npmjs.com/package/@unabandoned/chi-squared

# example

```
> var chi = require('chi-squared')
> chi.pdf(0.5, 1)
0.4393912894677223
> chi.pdf(2.3, 1.4)
0.11695769277348175
> chi.cdf(2, 2)
0.6321204474030797
```

# methods

var chi = require('chi-squared')

## chi.pdf(x, k)

Compute the probability density function for the parameter `x` under `k` degrees
of freedom.

## chi.cdf(x, k)

compute the cumulative density function. same parameters as above.

# install

With [npm](http://npmjs.org) do:

```
npm install @unabandoned/chi-squared
```

To keep existing `require('chi-squared')` / `import ... from 'chi-squared'`
call sites working unchanged, install it under the original name:

```json
"chi-squared": "npm:@unabandoned/chi-squared@^1.2.0"
```

# license

MIT
