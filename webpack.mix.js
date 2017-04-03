const {mix} = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
const sourceVendor = 'resources/assets/vendor/';
const sourceSassFolder = 'resources/assets/sass/';
const sourceJsFolder = 'resources/assets/js/';
const publicVendor = 'public/vendor/';
const publicCssDir = 'public/css/';
const publicJsDir = 'public/js/';
const publicFontDir = 'public/fonts/';

mix.js(sourceJsFolder + 'app.js', publicJsDir)
.sass(sourceSassFolder + 'library.scss', publicCssDir)
.js(sourceJsFolder + 'bootstrap.js', publicJsDir)
.sass('resources/assets/sass/app.scss', 'public/css');
mix.copy(
  sourceVendor + 'html5shiv/dist/html5shiv.min.js',
  publicVendor + 'html5shiv/html5shiv.min.js'
);
mix.copy(
  sourceVendor + 'respond/dest/respond.min.js',
  publicVendor + 'respond/respond.min.js'
);
mix.copy(
  sourceVendor + 'owl.carousel/dist/owl.carousel.min.js',
  publicVendor + 'owl.carousel/owl.carousel.min.js'
);