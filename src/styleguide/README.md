# KSS Styleguide

Caxy's boilerplate styleguide setup. Uses KSS-node to render, and Caxy's
Zaba theme to build.

[KSS Documentation](http://warpspire.com/kss/)

This styleguide boilerplate has its assets completely removed from the 
project assets. This does two things:
 
-   Streamlines implementation of the CSS assets themselves, since they
    aren't tangled up with the styleguide assets
-   Allows the styleguide to represent the project CSS with 100%
    accuracy, without styleguide CSS being misconstrued for project CSS.

## How to Generate Styleguide

**From within the /src/styleguide folder**

Run `npm install` to get up and running. You can then run the following
to build your styleguide:

`npm run generate-styleguide`

This will compile the styleguide's CSS and create the styleguide pages 
based on comments found in files in the /src/styles/ folder and the
markup HTML found in the src/styleguide/pattern-markup/ folder.


## Viewing the Styleguide

While in the src/styleguide/ folder, running `npm start` will start a
local server to aid in review, which is recommended. This will get
around quirks that can crop up with font rendering outside of a server
setting.

# Populating the Styleguide

KSS uses a slight variation of markdown to populate Handlebars templates
and create your styleguide. This markdown should be included in relevant
CSS files, and provides inline documentation of your CSS as a nice
byproduct.

If you find your example markup extends beyond four or five lines, it's
best to move it into a separate HTML file that KSS-node will reference,
rather than kept inside your Sass or CSS file. KSS-node crawls all
folders inside the styles folder, so if it finds any template names
referenced in your CSS they will be included in their correct position.

Also, if you don't want your markdown to appear in your final compiled
CSS (and ideally you shouldn't), remember to use `//` to comment rather
than `/* */` so that the markdown will be omitted.

## Modifying the Styleguide's Homepage

One quirk of KSS-node is the fact that it renders its index page from a
markdown file: homepage.md in the src/styleguide/ folder.

## Using Pattern Status Markers

Pattern status markers are aggressively applied in an effort to
encourage mindful documentation. If no status is set for a given
pattern, it will automatically display as In Development. In light of
this, they are not active by default when you clone this boilerplate
styleguide.

To activate pattern status markers for your project, set
`hide_pattern_status` to `false` in the config/kss-config.json file.

## Color Swatches

To populate your project's color swatches, do the following:

### Step 1: Create Color Sets

Sets of colors should be grouped as follows:

~~~~
$color-set-1 (
  primary: $color-primary,
  secondary: $color-secondary
);
~~~~

These should all then be added to an object named `$color-sets`:

~~~~
$color-sets: (
  "color-set-1": $color-set-1,
  "color-set-2": $color-set-2,
);
~~~~

### Step 2: Create Swatch Markup

Swatches will be created for the styleguide via a mixin with the
following class naming convention:

`.[color set name]--[variable name]`

So a color in the $color-set-1 set above with the name `primary` will
end up with the class name `.color-set-1--primary`. Your markup would
then look like this:

~~~~
<div class="kss-style">
  <h3 class="kss-title">Color Set 1</h3>
  <ul class="has-swatches kss-style">
    <li class="swatch color-set-1--primary"><span class="dot"></span></li>
    <li class="swatch color-set-1--secondary"><span class="dot"></span></li>
  </ul>
</div>
~~~~

The mixin will add the hex and rgba values to the page for reference for
you at this point.