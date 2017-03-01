'use strict';

const kss = require('kss');
const sass = require('node-sass');
const fs = require('fs');

const color = require('./color-swatches');

const outputCss = '../../dist/styleguide/kss-assets/styles/styleguide.css';
const kssConfig = fs.readFileSync('../../config/kss-config.json', 'utf-8');

const colorOptions = {
  variableFile : '../styles/example-colors.scss', // Would it be better to pass the result of fs.readFileSync instead?
  swatchColorSetName : '$kss-color-sets'
};




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



// Create color swatch markup file if needed.

color.createSassJson(colorOptions).then((data) => {
  color.createSwatchMarkup(data)
    .then(() => {
      buildKSS(JSON.parse(kssConfig));
    })
    .catch((error) => {
      return error;
    });
});