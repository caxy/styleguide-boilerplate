
'use strict';

const fs = require('fs');
const sassVars = require('get-sass-vars');

/*
* const options = {
*   variableFile : 'path/to/color/variable/file.scss',
*   swatchColorSetName : '$kss-color-sets',
*   markupPath: './path/to/markup/'
* };
 */

const generateSwatches = (options) => {

  const createSassJson = ( options) => {

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

    }).then((data) => {
      return data;
    }).catch((error) => {
      console.log('Error converting Sass to JSON: ' + error);
    });
  };

  const createSwatchMarkup = (data) => {

    return new Promise((resolve, reject) => {

      let swatchContent;
      let css = '<style>';
      let markup = `\n\n<div class="kss-style">\n`;

      for(let prop in data) {

        markup += `  <h3 class="kss-title">${ prop }</h3>\n  <ul class="has-swatches kss-style">\n`;

        for(let child in data[prop]) {

          let propClass = prop.toLowerCase().replace(' ', '-') + '--' + child;

          css += `.${ propClass } .dot { background: ${ data[prop][child] } }\n`;

          markup += `    <li class="kss-swatch ${ propClass }"><span class="dot"></span><span>${ child }<br />${ data[prop][child] }</span></li>\n`;
        }

        markup += `  </ul>\n`;
      }

      css += '</style>';
      markup += '</div>';

      swatchContent = css + markup;

      fs.writeFile(options.markupPath + 'generated-swatches.html', swatchContent, function(error, result){
        if(error){
          return reject(error);
        } else {
          return resolve();
        }
      });

    })
      .then(() => {
      console.log('Swatch markup created at ' + options.markupPath + 'generated-swatches.html');
    }).catch((error) => {
      console.log('Error creating swatch markup file: ' + error);
    });
  };

  return new Promise((resolve, reject) => {

    createSassJson(options)
      .then((data) => {
        createSwatchMarkup(data)
          .then(() => {
            return resolve();
          })
          .catch((error) => {
            return reject(error);
          });
      })
      .catch((error) => {
        return reject('Error: ' + error);
      });

  }).then(() => {
    console.log('Swatch generation complete.');
  }).catch((error) => {
    console.log('Error building swatches: ' + error);
  });

};

module.exports = generateSwatches;
