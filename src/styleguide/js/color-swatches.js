
'use strict';

/*
* Import all color swatch variables or maps from a given source file.
*
* Note: All referenced .scss files need to have comments in multiline,
* not // format.
*/

const fs = require('fs');
const sassVars = require('get-sass-vars');

module.exports = {

  createSassJson : (options) => {

    return new Promise((resolve, reject) => {

      if (fs.existsSync(options.variableFile) === false) {
        return reject('Error: Variable file not found at ' + options.variableFile);
      } else {

        let variableFileContent = fs.readFileSync(options.variableFile, 'utf-8');

        sassVars(variableFileContent)
          .then((data) => {
            if(data[options.swatchColorSetName]) {
              return resolve(data[options.swatchColorSetName]);
            } else {
              return reject('Error: ' + options.swatchColorSetName + ' not found in variable file.');
            }

          })
          .catch((error) => {
            return reject('Error generating Sass variables: ' + error);
          });
      }

    })

  },

  createSwatchMarkup : (data) => {

    return new Promise((resolve, reject) => {

      let swatchSetMarkup = `<div class="kss-style">\n`;

      for(let prop in data) {

        swatchSetMarkup += `  <h3 class="kss-title">${ prop }</h3>\n  <ul class="has-swatches kss-style">\n`;

        for(let child in data[prop]) {
          let propClass = prop.toLowerCase().replace(' ', '-');
          swatchSetMarkup += `    <li class="kss-swatch ${ propClass }--${ child }"><span class="dot"></span></li>\n`;
        }

        swatchSetMarkup += `  </ul>\n`;
      }

      swatchSetMarkup += `</div>`;

      fs.writeFile('./pattern-markup/generated-swatches.html', swatchSetMarkup, function(error, result){
        if(error){
          console.log(error);
        }
      }).then(() => {
        return resolve;
      }).catch((error) => {
        return reject('Error creating swatch markup file: ' + error);
      });

    });
  }

};





