'use strict';

const kss = require('kss');
const sass = require('node-sass');
const fs = require('fs');

const generateSwatches = require('./color-swatches');

let kssConfigPath = '../../config/kss-config.json';

const outputCss = '../../dist/styleguide/kss-assets/styles/styleguide.css';
const kssConfig = fs.readFileSync(kssConfigPath, 'utf-8');

const colorOptions = {
  variableFile : '../styles/example-colors.scss', // Would it be better to pass the result of fs.readFileSync instead?
  swatchColorSetName : '$kss-color-sets',
  markupPath : './pattern-markup/'
};

const kssOptions = {
  config: JSON.parse(kssConfig),
  color: colorOptions
};




// Compiles styleguide sass to compiled styleguide in /dist/;
// happens after
const compileSass = (outputCss) => {
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



const buildStyleguide = (options) => {

  if(options.color) {

    generateSwatches(options.color)
      .then(() => {

        // Build styleguide
        kss(options.config)
          .then(() => {
            compileSass(outputCss);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

  } else {
    kss(options.config)
      .then(() => {
        compileSass(outputCss);
      })
      .catch((error) => {
        console.log(error);
      });
  }

};



if(kssConfig.length > 0) {
  buildStyleguide(kssOptions);
} else {
  console.log('No KSS configuration information found at ' + kssConfigPath);
}

