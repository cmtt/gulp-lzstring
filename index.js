var through2 = require('through2');
var gutil = require('gulp-util');
var util = require('util');
var LZString = require('lz-string');
var MODI = 'compress decompress'.split(' ');
var Package = require('./package.json');

var Memcpy = require('memcpy');
var memcpy = Memcpy.binding || Memcpy.native;

module.exports = function (options) {
  var defaultOptions = {
    mode : 'compress'
  };

  options = options || {};
  options = util._extend(defaultOptions, options);

  return through2.obj(function (file, enc, next) {
    var self = this;

    if (MODI.indexOf(options.mode) === -1) {
      self.emit('error', new PluginError(Package.name, 'Unknown mode "'+options.mode+'".'));
      return next();
    }

    if (file.isNull()) {
      self.push(file);
      return next();
    }

    if (file.isStream()) {
      self.emit('error', new PluginError(Package.name, 'Streaming not supported.'));
      return next();
    }

    var data = null;
    var buf = null;

    if (options.mode === 'compress') {
      var compressFn = options.mode + (options.base64 ? 'ToBase64' : 'Uint8Array');
      var destEncoding = options.base64 ? 'base64' : 'binary';
      var encoded = LZString[compressFn](file.contents.toString(destEncoding));
      if (options.base64) {
        file.contents = new Buffer(encoded);
      } else {
        buf = new Buffer(encoded.length);
        memcpy(buf, encoded);
        file.contents = buf;
      }
    } else {
      var decompressFn = options.mode + (options.base64 ? 'FromBase64' : 'FromUint8Array');
      var srcEncoding = options.base64 ? 'base64' : 'binary';
      if (options.base64) {
        data = file.contents.toString('binary');
      } else {
        data = new Uint8Array(file.contents.length);
        memcpy(data, file.contents);
      }
      var dec = LZString[decompressFn](data);
      data = new Buffer(dec, srcEncoding);
      file.contents = data;
    }
    self.push(file);
    next();
    return;
  });

};

