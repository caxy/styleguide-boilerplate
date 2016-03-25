# KSS Styleguide Boilerplate

Boilerplate for Caxy living styleguide implementations. Uses KSS-node to render.

## Using in projects

Just pull these files into your project's assets folder and run `npm install` to get up and running. If you don't need to adjust the folder structure, you can then run the following to build your styleguide:

`npm run generate-styleguide`

or

`npm run generate-styleguide-verbose`

if you would like more information. Running either command also compiles a styleguide-specific version of the current CSS.

If your folder structure needs to be different, just adjust the path found in the `package.json` file included here.

# Populating the Styleguide

KSS uses a slight variation of markdown to populate Handlebars templates and create your styleguide. This markdown should be included in relevant CSS files, and provides inline documentation of your CSS as a nice byproduct.

If you find your example markup extends beyond four or five lines, it's best to move it into a separate HTML file that KSS-node will reference, rather than kept inside your Sass or CSS file. KSS-node crawls all folders inside the folder you've selected to run it on, so if it finds any template names referenced in your CSS they will be included in their correct position.

Also, if you don't want your markdown to appear in your final compiled CSS (and ideally you shouldn't), remember to use `//` to comment rather than `/* */` so that the markdown will be omitted.

## Modifying the Styleguide's Homepage

One quirk of KSS-node is the fact that it renders its index page from a markdown file. This file needs to be in the same folder as the Sass/Less files kss-node is iterating over to populate the styleguide with.

## Color Swatches

Color swatches are the most this-only-exists-for-the-styleguide part of a project's SCSS/CSS with this approach. As such, most of the code driving them lives in `/scss/kss-markup/` as HTML templates  or in `/scss/styleguide/`.