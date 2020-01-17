# @font-face/node

Generate @font-face CSS stylesheet like a pro !!

## Install

Using NPM:
```
npm install @font-face/node --save-dev
```

## Motivation

- Lets admit that it is very tedious job to manually generate @font-face CSS rules with corret URL sources for a given font files stored in local project directory.

- In order to apply fonts across all the browsers, we may need to maintain more that one font format.

- Online interactive web directory for fonts, like Google Fonts, auto generates CSS stylesheet with @font-face rules,  making it quite popular amoung front-ends developers.

- For locally stored font files, **@font-face/node** is an attempt to auto generate @font-face rules with given configurations to relieve developers from manually configuring fonts for every project.

- **@font-face/node** scans input font directory (provided in configs) and produces appropriate `src` CSS descriptor for various font formats like `eot`, `woff`, `woff2` and `svg` 

- **@font-face/node** also copies font files to build / dist directory provided in configs.

- Utilize output `font-face.css` with webpack loaders to include fonts in output bundle.

## Usage
**@font-face/node** can be invoked from [CLI](#cli-usage) or [API](#api-usage)

### CLI usage
Create a configuration file in the root project directory.  
**@font-face/node** uses [cosmiconfig][cosmiconfig] to read a configuration which can be configured with any of the following names:

- .font-facerc
- .font-facerc.json
- .font-facerc.yaml
- .font-facerc.yml
- .font-facerc.js
- font-face.config.js
- fontFace in package.json

And then simply execute:
```
$ font-face
```
OR using NPX command:
```
$ npx font-face
```

#### Example
Lets assume we have following directory structure:

    - Root
        * font-face.config.js
        * package.json
        - node_modules
        - src
            - fonts
                * Roboto-Light.ttf
                * Roboto-Light.woff2
                * Roboto-Medium.ttf
                * Roboto-Medium.woff2
                * Roboto-Regular.ttf
                * Roboto-Regular.woff2

    - indicates directory
    * indicates file

We have defined configurations as follows:

```js
// font-face.config.js

module.exports = {
    input: {
        dir: './src/fonts',
    },
    output: {
        dir: './dist',
        resourceDir: './dist/fontResources',
        cssFileName: 'font-face.css',
    },
    fonts: [
        {
            name: 'Roboto',
            weight: 200,
            style: 'normal',
            file: 'Roboto-Light',
        },
        {
            name: 'Roboto',
            weight: 400,
            style: 'normal',
            file: 'Roboto-Regular',
        },
        {
            name: 'Roboto',
            weight: 600,
            style: 'bold',
            file: 'Roboto-Medium',
        },
    ],
};
```

Upon executing **font-face** command we get following directory structure:


    - Root
        * font-face.config.js
        * package.json
        - node_modules
        - dist
            * font-face.css
            - fontResources
                * Roboto-Light.ttf
                * Roboto-Light.woff2
                * Roboto-Medium.ttf
                * Roboto-Medium.woff2
                * Roboto-Regular.ttf
                * Roboto-Regular.woff2
        - src
            - fonts
                * Roboto-Light.ttf
                * Roboto-Light.woff2
                * Roboto-Medium.ttf
                * Roboto-Medium.woff2
                * Roboto-Regular.ttf
                * Roboto-Regular.woff2

Contents of **font-face.css**:

```css
    @font-face { 
        font-family: 'Roboto'; 
        font-weight: 200; 
        font-style: normal; 
        src: url('fonts/Roboto-Light.woff2') format('woff2') , 
            url('fonts/Roboto-Light.ttf') format('truetype'); 
    }
    @font-face { 
        font-family: 'Roboto'; 
        font-weight: 400; 
        font-style: normal; 
        src: url('fonts/Roboto-Regular.woff2') format('woff2') , 
            url('fonts/Roboto-Regular.ttf') format('truetype'); 
    }
    @font-face { 
        font-family: 'Roboto'; 
        font-weight: 600; 
        font-style: bold; 
        src: url('fonts/Roboto-Medium.woff2') format('woff2') ,
            url('fonts/Roboto-Medium.ttf') format('truetype'); 
    }
```

> Please note:
>
>    1. Actual output does not include newlines, for verbosity it has been added here.
>    2. Depending on your platform , ie win32 or posix, appropriate path with appropriate slash will be generated.

### API usage

**@font-face/node** exports a function which will generate CSS file and copy fonts to dist / build folder.
Above similar output could be produced using node API as shown below:

```js
    const fontFaceNode = require('@font-face/node');

    fontFaceNode({
        input: {
            dir: './src/fonts',
        },
        output: {
            dir: './dist',
            resourceDir: './dist/fontResources',
            cssFileName: 'font-face.css',
        },
        fonts: [
            {
                name: 'Roboto',
                weight: 200,
                style: 'normal',
                file: 'Roboto-Light',
            },
            {
                name: 'Roboto',
                weight: 400,
                style: 'normal',
                file: 'Roboto-Regular',
            },
            {
                name: 'Roboto',
                weight: 600,
                style: 'bold',
                file: 'Roboto-Medium',
            },
        ],
    });
```

## Options

### `input.dir`

Type: `String`  
Input font directory.

### `output.dir`

Type: `String`  
Output directory for generated CSS file. Though this option is redundant but this has been added to make it consistend with input.dir.

### `output.resourceDir`

Type: `String`  
Default: `<input.dir>/resources`  
Fonts will be copied from `input.dir` to here. Usually this must be sub-directory within your build / dist directory.

### `output.cssFileName`
Type: `String`  
Default: `font-face.css`  
Output CSS file name.

### `output.fonts`
Type: `List`  
List of font configs.  
Following options are available under font config:

* name - Mandatory font-family name. 
* weight - font-weight
* display - font-display
* stretch - font-stretch
* style - font-style
* variant - font-variant
* unicodeRange - unicode-range
* featureSettings - font-feature-settings
* variationSettings - font-variation-settings

## Also see

    @font-face/core - Core module to create CSS @font-face rule.
    @font-face/browser - Include fonts dynamically through configs in browser.


[cosmiconfig]: https://github.com/davidtheclark/cosmiconfig