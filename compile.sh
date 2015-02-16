#!/usr/bin/env bash
lessc private/less/style.less > statics/app/css/style.css
jqfy -i private/templates/ -o private/scripts/templates.js --fix-return-type --return-object
cp private/scripts/templates.js statics/app/js/templates.js
#browserify private/scripts/main.js  -d > statics/app/js/main.js
#browserify private/scripts/main.js | uglifyjs -c -o statics/app/js/main.min.js 2>/dev/null