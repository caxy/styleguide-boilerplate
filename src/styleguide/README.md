# KSS Styleguide with Caxy's Zaba Theme Builder

This styleguide setup and builder has the following features:

- Color Swatches
- Pattern Markers


## How to Generate Styleguide

**From within the /src/styleguide folder**

Run `npm install` to get up and running. You can then run the following
to build your styleguide:

`npm run generate-styleguide`

This will compile the styleguide's CSS and create the styleguide pages 
based on comments found in files in the `/src/styles/` folder and the
markup HTML found in the `src/styleguide/pattern-markup/` folder.


## Viewing the Styleguide

While in the src/styleguide/ folder, running `npm start` will start a
local server to aid in review, which is recommended. This will get
around quirks that can crop up with font rendering outside of a server
setting.


## Populating and Editing the Styleguide

KSS uses a slight variation of markdown to populate Handlebars templates
and create your styleguide. This markdown should be included in relevant
CSS files, and provides inline documentation of your CSS as a nice
byproduct. Detailed examples can be found in the
[KSS Node project repo](https://github.com/kss-node/kss-node).

If you find your example markup extends beyond four or five lines, it's
best to move it into a separate HTML file that KSS-node will reference,
rather than kept inside your Sass or CSS file. KSS-node crawls all
folders inside the styles folder, so if it finds any template names
referenced in your CSS they will be included in their correct position.

Also, if you don't want your markdown to appear in your final compiled
CSS (and ideally you shouldn't), remember to use `//` to comment rather
than `/* */` so that the markdown will be omitted.


### Modifying the Styleguide's Homepage

The styleguide's index page is rendered from the markdown file
homepage.md in the `src/styleguide/project-assets` folder.

### Adding Breakpoints

Caxy's Zaba theme can display the current breakpoint in the upper
righthand corner. To enable this, add a breakpoints object to your
`kss-config.json` file like so:

```
{
  "source": [
    ...
  ],
  "breakpoints": {
    "micro": "20.3125rem",
    "small": "42.5rem",
    "medium": "57.5rem",
    "large": "75rem",
    "xlarge": "88.75rem",
    "xxlarge": "100rem"
  }
}
```

### Using Pattern Markers

Caxy's Zaba theme builder adds two pattern markers, defined with custom
kss values:

- `PatternType` : Pattern Type
- `Status` : Pattern Status (not active by default)

The are added to your markup in the following way:

~~~~
// Pattern Name
//
// Pattern description...
//
// PatternType: atom
//
// Status: ready
//
// Styleguide 3.1.1
~~~~

Marker values should be lowercase.

#### Pattern Status

Because not all styleguide projects will be iterative, pattern status
markers are not active by default. For situations where patterns will
need some kind of indicator of their production-readiness, these status
markers can be activated.

To activate pattern status markers for your project, set
`hide_pattern_status` to `false` in the config/kss-config.json file.

This marker has three values available:

- `development` : In Development (default)
- `review` : In Review
- `ready` : Production Ready

Pattern status markers are aggressively applied in an effort to
encourage mindful documentation. If no status is set for a given
pattern, it will automatically display as In Development.

#### Pattern Type

Pattern types follow [Brad Frost's Atomic Design methodology](http://bradfrost.com/blog/post/atomic-web-design/).

Use of this marker is entirely optional. If no `PatternType` value is
found, no marker displays.

To utilize these markers, the following values are available:

- `atom`
- `molecule`
- `organism`
- `template`
- `page`

### Using Color Swatches

Color swatches for Zaba are generated using a specially named map in your
project's Sass files.

To populate your project's color swatches, do the following:

#### Step 1: Create Color Sets

In your styleguide-specific Sass file, create sets of colors and group
them as follows:

~~~~
$color-set-1 (
  primary: $color-primary,
  secondary: $color-secondary
);
~~~~

**Please note:** This file cannot contain `//` comments, only `/* */`;

#### Step 2: Name and Organize Color Sets

Add your created color sets to a Sass map and note the name (the
styleguide will reference `$kss-color-sets` by default). For the keys,
use names you would like to have appear in the styleguide.

~~~~
$kss-color-sets: (
  "Brand Colors": $color-set-1,
  "Font Colors": $color-set-2,
);
~~~~

**Please note:** At this time, special characters are not allowed. 

#### Step 3: Populate File Options

In `src/styleguide/js/generate-styleguide.js`, update the following
object with information for your project:

```
const colorOptions = {
  variableFile : '../styles/example-colors.scss', // File where your $kss-color-sets map is.
  swatchColorSetName : '$kss-color-sets', // Default value
  markupPath : './pattern-markup/' // Path to your project's styleguide markup files
};
```