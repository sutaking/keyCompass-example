/**
Crushinator Helpers
Library of simple JS methods to produce crushed image URLs.
http://github.com/tedconf/js-crushinator-helpers
*/

/**
Returns a version of the image URL that uses Crushinator with the
specified options string:

    crush('http://images.ted.com/image.jpg', 'w=320')
      => 'https://tedcdnpi-a.akamaihd.net/images.ted.com/image.jpg?w=320'

@public
@param {string} url
@param {string} options
@returns {string}
*/
'use strict';
/*
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.crush = crush;
exports.uncrush = uncrush;
exports.crushable = crushable;*/

function crush(url, options) {
  // Avoid double-crushing the image
  url = uncrush(url);

  // Apply host whitelist
  if (!crushable(url)) {
    return url;
  }

  return 'https://tedcdnpi-a.akamaihd.net/r/' + url.replace(/.*\/\//, '') + '?' + (options || '');
}

/**
Restore a previously crushed URL to its original form.

@param {string} url
@returns {string}
*/

function uncrush(_x) {
  var _again = true;

  _function: while (_again) {
    var url = _x;
    _again = false;

    var parts;

    // Avoid double-crushing images
    parts = url.match(/(.+)?\/\/(?:img(?:-ssl)?\.tedcdn\.com|tedcdnpi-a\.akamaihd\.net)\/r\/([^?]+)/);
    if (parts) {
      _x = parts[1] + '//' + parts[2];
      _again = true;
      parts = undefined;
      continue _function;
    }

    return url;
  }
}

/**
Check to see if a URL passes Crushinator's host whitelist.

@param {string} url
@returns {boolean}
*/

function crushable(url) {
  return !!url.match(/(tedcdn|(images|storage|tedlive|tedlive-staging|tedcdnp(e|f)-a)\.ted|(s3|s3-us-west-2)\.amazonaws|\.akamaihd)\.(com|net)/);
}

//exports['default'] = crush;