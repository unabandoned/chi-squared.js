'use strict';

var { describe, it } = require('node:test');
var assert = require('node:assert');

var chi = require('../');

function close(actual, expected, tol) {
  assert.ok(
    Math.abs(actual - expected) <= tol,
    actual + ' is not within ' + tol + ' of ' + expected
  );
}

describe('chi.pdf', function () {
  it('matches the upstream regression values exactly', function () {
    assert.strictEqual(chi.pdf(0.5, 1), 0.4393912894677223);
    assert.strictEqual(chi.pdf(2.3, 1.4), 0.11695769277348175);
  });

  it('agrees with the closed form for k = 2, e^(-x/2) / 2', function () {
    [0.1, 1, 2, 5, 10].forEach(function (x) {
      close(chi.pdf(x, 2), Math.exp(-x / 2) / 2, 1e-12);
    });
  });

  it('agrees with the closed form for k = 4, x e^(-x/2) / 4', function () {
    [0.5, 3, 10].forEach(function (x) {
      close(chi.pdf(x, 4), x * Math.exp(-x / 2) / 4, 1e-12);
    });
  });

  it('is zero below the support', function () {
    assert.strictEqual(chi.pdf(-1, 2), 0);
    assert.strictEqual(chi.pdf(0, 3), 0);
  });
});

describe('chi.cdf', function () {
  it('matches the upstream regression values exactly', function () {
    assert.strictEqual(chi.cdf(2, 2), 0.6321204474030797);
    assert.strictEqual(chi.cdf(1, 3), 0.19874802827905516);
    assert.strictEqual(chi.cdf(200, 256), 0.00399456708950239);
  });

  it('agrees with the closed form for k = 2, 1 - e^(-x/2)', function () {
    [0.001, 0.5, 2, 6, 20].forEach(function (x) {
      close(chi.cdf(x, 2), 1 - Math.exp(-x / 2), 1e-6);
    });
  });

  it('hits the textbook critical values', function () {
    close(chi.cdf(3.841458820694124, 1), 0.95, 1e-6);
    close(chi.cdf(6.634896601021214, 1), 0.99, 1e-6);
    close(chi.cdf(11.070497693516351, 5), 0.95, 1e-6);
    close(chi.cdf(18.307038053275146, 10), 0.95, 1e-6);
    close(chi.cdf(2.705543454095404, 1), 0.90, 1e-6);
  });

  it('sits near one half at the median for large k', function () {
    close(chi.cdf(254.33, 255), 0.5, 1e-3);
  });

  it('is zero at the origin and rejects non-positive degrees of freedom', function () {
    assert.strictEqual(chi.cdf(0, 4), 0);
    assert.throws(function () { chi.cdf(1, 0); }, /Degrees of freedom must be positive/);
  });
});
