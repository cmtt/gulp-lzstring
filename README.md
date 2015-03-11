# gulp-lzstring
> Compresses files using [lz-string](https://github.com/pieroxy/lz-string).

## Usage

Install this plugin using npm:

```shell
npm install --save-dev gulp-lz-string
```

In order to compress or decompress a file, use the following syntax in your
Gulpfile:

```javascript
var lzString = require('gulp-lz-string');

gulp.task('lz', function(){
  gulp.src([
    'data/readme.md'
  ])
  .pipe(lzString({
    mode : 'compress'
  }))
  .pipe(gulp.dest('lz/'));
});
```

## Options

This plugin takes two optional parameters:

##### ``mode {string}``

You can ``compress`` or ``decompress`` files.

##### ``base64 {boolean}``

If you choose to encode the compressed files using base64 instead of working
with buffers, you can enable this encoding here.

## Changelog

0.0.1 - 03/11/2015

Initial release.

## Licence
````
          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                      Version 2, December 2004

   Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

   Everyone is permitted to copy and distribute verbatim or modified
   copies of this license document, and changing it is allowed as long
   as the name is changed.

              DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
     TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

    0. You just DO WHAT THE FUCK YOU WANT TO.
````
