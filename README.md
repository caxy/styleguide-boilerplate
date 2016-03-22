# KSS Styleguide Boilerplate

Boilerplate for Caxy living styleguide implementations. Uses KSS-node to render.

## Using in projects

Just pull these files into your project's assets folder and run `npm install` to get up and running. If you don't need to adjust the folder structure, you can then run the following to build your styleguide:

`npm run generate-styleguide`

If your folder structure needs to be different, just adjust the path found in the `package.json` file included here.

### Populating the Styleguide

KSS uses a slight variation of markdown to populate Handlebars templates and create your styleguide. This markdown should be included in relevant CSS files, and provides inline documentation of your CSS as a nice byproduct.

### Modifying the Styleguide's Homepage

One quirk of KSS-node is the fact that it renders its index page from a markdown file. This file needs to be in the same folder as the Sass/Less files kss-node is iterating over to populate the styleguide with.
