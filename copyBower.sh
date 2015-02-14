#!/usr/bin/env bash

# clean
rm statics/lib/ -r
rm private/less/lib/bootstrap/ -r

# mkdir
mkdir statics/lib/js/ -p
mkdir statics/lib/css/ -p
mkdir statics/lib/fonts/ -p
mkdir private/less/lib/bootstrap/ -p

# copy
cp bower_components/jquery/dist/* statics/lib/js/ -r
cp bower_components/bootstrap/dist/* statics/lib/ -r
cp bower_components/bootstrap/less/* private/less/lib/bootstrap/ -r
cp bower_components/material-colors/dist/colors.css statics/lib/css/material-colors.css
cp bower_components/material-colors/dist/colors.less private/less/lib/material-colors.less
cp bower_components/font-awesome/css/* statics/lib/css/
cp bower_components/font-awesome/fonts/* statics/lib/fonts/
cp bower_components/lodash/lodash.js statics/lib/js/
cp bower_components/lodash/lodash.min.js statics/lib/js/
cp bower_components/backbone/backbone.js statics/lib/js/
cp bower_components/toastr/toastr.min.js statics/lib/js/
cp bower_components/toastr/toastr.js statics/lib/js/
cp bower_components/toastr/toastr.css statics/lib/css/


cat <<LESS >> private/less/lib/material-colors.less
@md-colors: ~'red', ~'pink', ~'purple', ~'deep-purple', ~'indigo', ~'blue', ~'light-blue', ~'cyan', ~'teal', ~'green', ~'light-green', ~'lime', ~'yellow', ~'amber', ~'orange', ~'deep-orange', ~'brown', ~'grey', ~'blue-grey';
LESS


