﻿export class DebugConsole {
  // ta: HTMLTextAreaElement;
  private text = '';
  /** @constructor */
  public constructor(textarea: HTMLTextAreaElement) {
    // this.ta = textarea;
  }
  public getText() {
    return this.text;
  }
  public resetText() {
    this.text = '';
  }
  print(str: string) {
    this.text += str;
    //var segments = str.split("\n");
    //for (var i = 0; i < segments.length; i++) {
    //    // this.ta.appendChild(document.createTextNode(segments[i]));
    //    if (i < segments.length - 1) {
    //        // this.ta.appendChild(document.createElement("br"));
    //    }
    //}
  }

  printf(...args: any[]) {
    function convert(match: any, nosign = false) {
      if (nosign) {
        match.sign = '';
      } else {
        match.sign = match.negative ? '-' : match.sign;
      }
      var l = match.min - match.argument.length + 1 - match.sign.length;
      var pad = new Array(l < 0 ? 0 : l).join(match.pad);
      if (!match.left) {
        if (match.pad == '0' || nosign) {
          return match.sign + pad + match.argument;
        } else {
          return pad + match.sign + match.argument;
        }
      } else {
        if (match.pad == '0' || nosign) {
          return match.sign + match.argument + pad.replace(/0/g, ' ');
        } else {
          return match.sign + match.argument + pad;
        }
      }
    }

    if (typeof arguments == 'undefined') {
      return;
    }
    if (arguments.length < 1) {
      return;
    }
    // var args = <any[]>arguments;
    if (args[0] instanceof Array) {
      args = args[0];
    }
    if (typeof args[0] != 'string') {
      return;
    }
    if (typeof RegExp == 'undefined') {
      return;
    }

    var string = args[0];
    var exp = new RegExp(
      /(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g
    );
    var matches = [];
    var strings = [];
    var convCount = 0;
    var stringPosStart = 0;
    var stringPosEnd = 0;
    var matchPosEnd = 0;
    var newString = '';
    var match = null;
    var substitution;

    for (;;) {
      match = exp.exec(string);
      if (!match) {
        break;
      }
      if (match[9]) {
        convCount += 1;
      }

      stringPosStart = matchPosEnd;
      stringPosEnd = exp.lastIndex - match[0].length;
      strings[strings.length] = string.substring(stringPosStart, stringPosEnd);

      matchPosEnd = exp.lastIndex;
      matches[matches.length] = {
        match: match[0],
        left: match[3] ? true : false,
        sign: match[4] || '',
        pad: match[5] || ' ',
        min: match[6] || 0,
        precision: match[8],
        code: match[9] || '%',
        negative: parseInt(args[convCount], 10) < 0 ? true : false,
        argument: String(args[convCount]),
      };
    }
    strings[strings.length] = string.substring(matchPosEnd);

    if (args.length - 1 < convCount) {
      return;
    }

    var i = null;

    for (i = 0; i < matches.length; i++) {
      if (matches[i].code == '%') {
        substitution = '%';
      } else if (matches[i].code == 'b') {
        matches[i].argument = String(
          Math.abs(parseInt(matches[i].argument, 10)).toString(2)
        );
        substitution = convert(matches[i], true);
      } else if (matches[i].code == 'c') {
        matches[i].argument = String(
          String.fromCharCode(
            /*parseInt(*/ Math.abs(parseInt(matches[i].argument, 10) /*), 10)*/)
          )
        );
        substitution = convert(matches[i], true);
      } else if (matches[i].code == 'd') {
        matches[i].argument = String(
          Math.abs(parseInt(matches[i].argument, 10))
        );
        substitution = convert(matches[i]);
      } else if (matches[i].code == 'f') {
        matches[i].argument = String(
          Math.abs(parseFloat(matches[i].argument)).toFixed(
            matches[i].precision ? <any>matches[i].precision : 6
          )
        );
        substitution = convert(matches[i]);
      } else if (matches[i].code == 'o') {
        matches[i].argument = String(
          Math.abs(parseInt(matches[i].argument, 10)).toString(8)
        );
        substitution = convert(matches[i]);
      } else if (matches[i].code == 's') {
        matches[i].argument = matches[i].argument.substring(
          0,
          matches[i].precision
            ? <any>matches[i].precision
            : matches[i].argument.length
        );
        substitution = convert(matches[i], true);
      } else if (matches[i].code == 'x') {
        matches[i].argument = String(
          Math.abs(parseInt(matches[i].argument, 10)).toString(16)
        );
        substitution = convert(matches[i]);
      } else if (matches[i].code == 'X') {
        matches[i].argument = String(
          Math.abs(parseInt(matches[i].argument, 10)).toString(16)
        );
        substitution = convert(matches[i]).toUpperCase();
      } else {
        substitution = matches[i].match;
      }

      newString += strings[i];
      newString += substitution;
    }

    newString += strings[i];
    this.print(newString);
  }
}
