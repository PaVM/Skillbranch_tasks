
class ColorConverter {
  constructor() {
    this.convert = this.convert.bind(this);
  }


  convert(rawColor) {
    const INVALID_COLOR = 'Invalid color';
    const HSL_LIST = {
      0: {
        r: 'ff',
        g: '00',
        b: '00',
      },
      15: {
        r: 'ff',
        g: '40',
        b: '00',
      },
      30: {
        r: 'ff',
        g: '80',
        b: '00',
      },
      45: {
        r: 'ff',
        g: 'bf',
        b: '00',
      },
      60: {
        r: 'ff',
        g: 'ff',
        b: '00',
      },
      75: {
        r: 'bf',
        g: 'ff',
        b: '00',
      },
      90: {
        r: '80',
        g: 'ff',
        b: '00',
      },
      105: {
        r: '40',
        g: 'ff',
        b: '00',
      },
      120: {
        r: '00',
        g: 'ff',
        b: '00',
      },
      135: {
        r: '00',
        g: 'ff',
        b: '40',
      },
      150: {
        r: '00',
        g: 'ff',
        b: '80',
      },
      165: {
        r: '00',
        g: 'ff',
        b: 'bf',
      },
      180: {
        r: '00',
        g: 'ff',
        b: 'ff',
      },
      195: {
        r: '00',
        g: 'bf',
        b: 'ff',
      },
      210: {
        r: '00',
        g: '80',
        b: 'ff',
      },
      225: {
        r: '00',
        g: '40',
        b: 'ff',
      },
      240: {
        r: '00',
        g: '00',
        b: 'ff',
      },
      255: {
        r: '40',
        g: '00',
        b: 'ff',
      },
      270: {
        r: '80',
        g: '00',
        b: 'ff',
      },
      285: {
        r: 'bf',
        g: '00',
        b: 'ff',
      },
      300: {
        r: 'ff',
        g: '00',
        b: 'ff',
      },
      315: {
        r: 'ff',
        g: '00',
        b: 'bf',
      },
      330: {
        r: 'ff',
        g: '00',
        b: '80',
      },
      345: {
        r: 'ff',
        g: '00',
        b: '40',
      },
      360: {
        r: 'ff',
        g: '00',
        b: '00',
      },
    };

    this.color = rawColor.replace(/(%)(?=[,)])/gi, '');

    // console.log(`raw: ${rawColor}`);
    // console.log(`replaced: ${this.color}`);

    this.color = decodeURI(this.color).toLowerCase().trim();

    // console.log(`sub: ${this.color}`);

    const rgbExp = /^(?:\s*)rgb\((?:\s*)(2[0-5]{2}|1\d{2}|\d{1,2})(?:\s*),(?:\s*)(2[0-5]{2}|1\d{2}|\d{1,2})(?:\s*),(?:\s*)(2[0-5]{2}|1\d{2}|\d{1,2}|0)(?:\s*)\)$/gi;
    const hexExp = /(^([0-9a-fA-F]{3}){1,2}$)/gi;
    const hslExp = /(?:^(?:hsl\((3[0-4][0-5]?|2\d{2}|1\d{2}|\d{1,2}|0),\s?(100|\d{1,2}),\s?)(100|\d{1,2})\))/gi;

    function hexNormilize(hex) {
      // set style type from aea to aaeeaa
      let result;
      if (hex.length < 4) {
        result = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      } else {
        result = hex;
      }
      return result;
    }

    function hexFromRGB(rgb) {
      const red   = (+rgb[1].length < 2) ? (+rgb[1]).toString(16) + '0': (+rgb[1]).toString(16);
      const green = (+rgb[2].length < 2) ? (+rgb[2]).toString(16) + '0': (+rgb[2]).toString(16);
      const blue  = (+rgb[3].length < 2) ? (+rgb[3]).toString(16) + '0': (+rgb[3]).toString(16);
      return red + green + blue;
    }

    function hexFromHSL(hsl) {
      let hue = hsl[1];
      let sat = hsl[2];
      let lgh = hsl[3];
      // console.log(hsl);
      let hues = HSL_LIST[hsl[1]];
      // console.log(hues);
      let red   = hues.r;
      let green = hues.g;
      let blue  = hues.b;
      // console.log(hsl[2]);

      function saturation(color) {
        color = parseInt(color, 16);
        // console.log('saturation start');
        let defcolor;
        if (color > 127) {
          defcolor = Math.round((color - 128) / 1.27);
          const newcolor = hsl[2] - 100;
          color = Math.round( (defcolor + newcolor) * 1.27 + 127);
          // console.log(defcolor);
          // console.log(newcolor);
          // console.log(color);

        } else {
          defcolor = Math.round((color) / 1.27);
          const newcolor = 100 - hsl[2];
          color = Math.round( (defcolor + newcolor) * 1.27);

          // console.log(defcolor);
          // console.log(newcolor);
          // console.log(color);

        }

        // const newcolor = hsl[2] - defcolor;
        // color = Math.round( (defcolor + newcolor) * 1.27) + 127;
        if (color.length < 2) { color = color + '0'; }
        return color;
      }

      let satur = 21;

      // console.log(`red: ${red}, green: ${green}, blue: ${blue}`);
      // console.log(`red: ${red.toString(16)}, green: ${green.toString(16)}, blue: ${blue.toString(16)}`);
      // let satur = ((parseInt(red, 16) - 128) / 1.27);
      // satur = Math.round(hsl[2] * 1.27 + 127);
      red = saturation(red);
      // satur = Math.round((satur - (satur - hsl[2])) * 1.27 + 127);
      // red = satur.toString(16);
      // console.log(`red: ${red}, satur: ${satur}`);
      // console.log(`satur : ${satur}`);
      // console.log(`red : ${parseInt(red, 16)}`);

      // satur = (parseInt(green, 16) / 1.27);
      // satur = Math.round(hsl[2] * 1.27);
      // green = satur.toString(16);
      green = saturation(green);
      // console.log(`green: ${green}, satur: ${satur}`);
      // console.log(`satur : ${satur}`);

      // satur = (parseInt(blue, 16) / 1.27);
      // satur = Math.round(hsl[2] * 1.27);
      // blue = satur.toString(16);
      blue = saturation(blue);
      // console.log(`blue: ${blue}, satur: ${satur}`);
      // console.log(`satur : ${satur}`);

      // let lig = Math.round((parseInt(red, 16) / 2.55) - hsl[3]);
      // red = Math.round(parseInt(red,16) + lig*2.55).toString(16);
      // console.log(`red: ${red}, lig: ${lig}`);
      // console.log(`lig : ${lig}`);
      // console.log(`red : ${parseInt(red, 16)}`);
      // d
      // g
      // b
      // console.log(`red: ${red}, green: ${green}, blue: ${blue}`);
      // console.log(`red: ${red.toString(16)}, green: ${green.toString(16)}, blue: ${blue.toString(16)}`);

      function lighten(colors) {
        // not work
        colors.map(function(color) {
          return parseInt(color, 16);
        });

        // console.log('lighten start');

        const maxColor = Math.max.apply(null, colors);
        console.log(maxColor);
        console.log(colors);
        if (lgh > 50) {
          let defMax;
          if (maxColor > 185) {
            defMax = Math.round((maxColor - 185) / 1.4) + 50;
          } else {
            defMax = Math.round(maxColor / 3.7);
          }
        }

        // console.log(`defMax : ${defMax}`);
        // const defcolor = Math.round((color) / 2.55);
        // const newcolor = Math.round((defcolor / 100) * hsl[3]);
        // if (newcolor >= 0) {
        //   color = Math.round( (defcolor + newcolor) * 2.55);
        // } else {
        //   color = Math.round( (defcolor + newcolor) * 2.55);
        // }
        let newcolor = defMax;
        return newcolor;
      }

      // red = lighten(red);
      // green = lighten(green);
      // blue = lighten(blue);
      // let rr = lighten([red, green, blue]);
      // console.log(`red: ${red}, green: ${green}, blue: ${blue}`);
      // console.log(`red: ${red.toString(16)}, green: ${green.toString(16)}, blue: ${blue.toString(16)}`);

      return red.toString(16) + green.toString(16) + blue.toString(16);
    }

    let result;

    const rgb = rgbExp.exec(this.color);
    const hsl = hslExp.exec(this.color);

    if (~this.color.indexOf('#')) {
      this.color = this.color.substring(1);
    }
    const hex = hexExp.exec(this.color);

    if (rgb !== null) {
      result = hexFromRGB(rgb);
    } else if (hex !== null) {
      result = hexNormilize(hex[0]);
    } else if (hsl !== null) {
      result = hexFromHSL(hsl);
    } else {
      result = INVALID_COLOR;
    }
    return result;
  }
}

/*
//
// new tested not beauty : (?:^(?:rgb\((((?:2[0-5]{2})|(?:1\d{2})|(?:\d{1,2})),(?:\s)?){2})((?:2[0-5]{2})|(?:1\d{2})|(?:\d{1,2})|(?:0))\)$)
//
    // all: (^(?:#)?([0-9a-fA-F]{3,6})$)|(^(hsl\(((3[0-4](?:[0-5])?)|2\d{1,2}|1\d{1,2}|\d{1,2}|0),(?:\s)?(100|\d{1,2})%,(\s)?)(100|\d{1,2})%\)$)|(^(rgb\((((2[0-5]{2})|1\d{2}|\d{1,2}|0),(\s)?){2})((2[0-5]{2})|1\d{2}|\d{1,2}|0)\)$)

    // (^(?:#)?([0-9a-fA-F]{3,6})$)
    //      #    ^^^^^^^^^ 3-6 symbols
    // check hex

    // (?:^(?:hsl\(((3[0-4](?:[0-5])?)|2\d{2}|1\d{2}|\d{1,2}|0),(?:\s)?(100|\d{1,2})%,(?:\s)?)(100|\d{1,2})%\))
    //       ^^^^  ^^^^^^^^^^^  range 0-345  ^^^^^^^^^^^^^^^^^  ^^^^^  ^^^ 0-100% ^^^       ^^^ 0-100% ^^^
    //  check HSL

    // (^(rgb\((((2[0-5]{2})|1\d{2}|\d{1,2}|0),(\s)?){2})((2[0-5]{2})|1\d{2}|\d{1,2}|0)\)$)
    //    rgb   ^^^^^^^  rande 0-255  : 2 times ^^^^^^^   ^^^^^ 0-255 third times ^^^^^
    // check rgb


*/

export default ColorConverter;
