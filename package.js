Package.describe({
  summary: "Imagemagick future-wrapped API"
});

Npm.depends({
    "imagemagick": "0.1.3"
});

Package.on_use(function (api) {
  api.add_files("imagemagick.js", "server");
});