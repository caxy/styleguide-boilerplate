'use strict';

const kss = require('kss');
const sass = require('node-sass');
const fs = require('fs');

const generateSwatches = require('./color-swatches');
const processArgs = process.argv.slice(2); // Values passed when running generate-styleguide.js

const kssConfigPath = '../../config/kss-config.json';

const kssOptions = {
  config: JSON.parse(fs.readFileSync(kssConfigPath, 'utf-8')),
  color: {
    variableFile : '../styles/example-colors.scss', // Would it be better to pass the result of fs.readFileSync instead?
    swatchColorSetName : '$kss-color-sets',
    markupPath : './pattern-markup/'
  }
};

let tasks = {
  generateSwatches: (processArgs.indexOf('swatches') >= 0),
  compileCSS: (processArgs.indexOf('compile-css') >= 0),
  all: (processArgs.indexOf('complete') >= 0)
};


/**
 * Compiles styleguide CSS.
 */
const compileKssCss = () => {

  return new Promise((resolve,reject) => {

    let outputCss = './caxy-zaba-template/kss-assets/styles/styleguide.css';

    sass.render({
      file: './scss/caxy-zaba.scss',
      includePaths: [ './node_modules/normalize-css/' ],
      outFile: outputCss
    }, function(error, result) {
      if (error) {
        return reject(error);
      } else {
        fs.writeFile(outputCss, result.css, function(error, result){
          if (error){
            return reject(error);
          } else {
            return resolve();
          }
        });
      }
    });
  }).then(() => {
    console.log('KSS theme CSS recompiled.')
  }).catch((error) => {
    console.log(error);
  });
};


/**
 * Builds styleguide
 * 
 * @param options
 */
const buildStyleguide = (options) => {

  if (tasks.generateSwatches || tasks.all) {

    generateSwatches(options.color)
      .then(() => {
        if(tasks.compileCSS || tasks.all) {
          compileKssCss()
            .then(() => {
              kss(options.config);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          kss(options.config);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  } else if (tasks.compileCSS) {

    compileKssCss()
      .then(() => {
        kss(options.config);
      })
      .catch((error) => {
        console.log(error);
      });

  } else {
    kss(options.config);
  }

};


buildStyleguide(kssOptions);

