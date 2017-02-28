'use strict';

const kss = require('kss');
const sass = require('node-sass');
const fs = require('fs');
let outputCss = '../../dist/styleguide/kss-assets/styles/styleguide.css';
let kssOptions = fs.readFileSync('../../config/kss-config.json', 'utf-8');

let compileSass = (outputCss) => {
  sass.render({
    file: './scss/caxy-zaba.scss',
    includePaths: [ './node_modules/normalize-css/' ],
    outFile: outputCss
  }, function(error, result) {
    if (error) {
      console.log('Error: ' + error);
    } else {
      fs.writeFile(outputCss, result.css, function(error, result){
        if(error){
          console.log(error);
        }
      });
    }
  });
};

let buildKSS = (options) => {
  kss(options).then(function () {
      compileSass(outputCss);
  });
};

buildKSS(JSON.parse(kssOptions));