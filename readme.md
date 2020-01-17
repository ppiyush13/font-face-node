# @font-face/node

Gerenate @font-face CSS stylesheet like a pro !!

## Install

Using NPM:
```
npm install @font-face/node --save-dev
```

## Background

    - Lets admit that it is very tedious job to manually generate @font-face CSS rules with corret URL source for a given font files stored in local project directory. 
    - In order to apply fonts across all browser vendors, we may need to maintain more that one font format. This aggrevates the issue further.
    - Online interactive web directory for fonts, like Google Fonts, auto generates CSS stylesheet with @font-face rules making it quite popular amoung front-ends developers.
    - For locally stored font files, *@font-face/node* is an attempt to auto generate @font-face rules with given configurations to relieve developers from manually configuring for every project.

## Usage
*@font-face/node* can be invoked from CLI or the API access.

### CLI usage
Create a configuration file in the root project directory .
*@font-face/node* uses cosmiconfig to read a configuration which can be configured with any following names:

- .font-facerc
- .font-facerc.json
- .font-facerc.yaml
- .font-facerc.yml
- .font-facerc.js
- font-face.config.js
- fontFace in package.json

And then simple generate CSS file with command:
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
        - node_modules
        - src
            - fonts
                * Roboto-Light.ttf
                * Roboto-Light.woff2
                * Roboto-Medium.ttf
                * Roboto-Medium.woff2
                * Roboto-Regular.ttf
                * Roboto-Regular.woff2

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

Upon executing *font-face* command we get following directory structure:


    - Root
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

And contents of *font-face.css* are as follows:

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
    1. Actual output does not include newlines, for verbosity it has been added here.
    2. Depending on your platform , ie win32 or posix, appropriate path will be generated.

### API usage

Similar output could be produced using node API as shown below:

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
Specify input font directory to scan.

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