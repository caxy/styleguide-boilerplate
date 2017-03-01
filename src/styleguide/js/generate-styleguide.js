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


// Create color swatch markup file if needed.

color.createSassJson(colorOptions).then((data) => {
  // TODO: Insert function to create color swatch markup from this data
});




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

buildKSS(JSON.parse(kssConfig));
