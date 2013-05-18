# Meteor Imagemagick

Meteor wrapped library [node-imagemagick](https://github.com/rsms/node-imagemagick) into a synchronous API, using Futures.

## Installation

You need at least version 0.6.0 of Meteor.

Meteor Imagemagick can be installed with [Meteorite](https://github.com/oortcloud/meteorite/). From inside a Meteorite-managed app:

``` sh
$ mrt add imagemagick
```

## API
Based on node-imagemagick original doc.

### identify(path)

Identify file at `path` and return an object `features`.

Example:

```javascript
var features = Imagemagick.identify('kittens.jpg');
console.log(features);
```

### identify(args)

Custom identification where `args` is an array of arguments. The result is returned as a raw string to `output`.

Example:

```javascript
var output = Imagemagick.identify(['-format', '%wx%h', 'kittens.jpg']);
console.log('dimension: '+output);
```

### readMetadata(path)

Read metadata (i.e. exif) in `path` and return an object `metadata`. Modelled on top of `identify`.

Example:

```javascript
var metadata = Imagemagick.readMetadata('kittens.jpg');
console.log('Shot at '+metadata.exif.dateTimeOriginal);
```

## convert(args)

Raw interface to `convert` passing arguments in the array `args`.

Example:

```javascript
Imagemagick.convert(['kittens.jpg', '-resize', '25x120', 'kittens-small.jpg']);
```

### resize(options)

Convenience function for resizing an image, modelled on top of `convert`.

The `options` argument have the following default values:

```javascript
{
  srcPath: undefined,
  srcData: null,
  srcFormat: null,
  dstPath: undefined,
  quality: 0.8,
  format: 'jpg',
  progressive: false,
  width: 0,
  height: 0,
  strip: true,
  filter: 'Lagrange',
  sharpening: 0.2,
  customArgs: []
}
```

srcPath, dstPath and (at least one of) width and height are required. The rest is optional.

Example:

```javascript
Imagemagick.resize({
  srcPath: 'kittens.jpg',
  dstPath: 'kittens-small.jpg',
  width:   256
});
console.log('resized kittens.jpg to fit within 256x256px');
```

### crop(options, callback) ###
Convenience function for resizing and cropping an image. _crop_ uses the resize method, so _options_ and _callback_ are the same. _crop_ uses _options.srcPath_, so make sure you set it :) Using only _options.width_ or _options.height_ will create a square dimensioned image.  Gravity can also be specified, it defaults to Center.   Available gravity options are [NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast]

Example:

```javascript
Imagemagick.crop({
  srcPath: path,
  dstPath: 'cropped.jpg',
  width: 800,
  height: 600,
  quality: 1,
  gravity: "North"
});
```