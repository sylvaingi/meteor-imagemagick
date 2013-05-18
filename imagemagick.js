var Future = Npm.require("fibers/future");
var im = Npm.require("imagemagick");

Imagemagick = {};

["identify", "readMetadata", "convert", "resize", "crop"].forEach(function(fn){
    Imagemagick[fn] = function(args){
        var future = new Future();
        var cb = future.resolver();

        im[fn](args, cb);

        return future.wait();
    };
});