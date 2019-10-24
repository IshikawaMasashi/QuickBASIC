import { dbg /*ScriptSrc*/ } from "./qb";
import { ImageManipulator } from "./ImageManipulator";
import { INumberDictionary } from "./base/common/collections";
import CharacterImageGenerator from "./CharacterImageGenerator";
import IConsole from "./virtualMachine/IConsole";

export var globalConsole: _Console;
/** @constructor */
export class _Console implements IConsole {
  ctx: CanvasRenderingContext2D;
  interval = 0;
  cursorEnabled = false;
  cursorShown = false;
  cursorBackground: any = null;
  keyBuffer: number[] = [];
  hasFocus = false;

  fgcolourNum: number;
  bgcolourNum: number;
  bgcolour: string;
  fgcolour: string;
  curX = 0;
  curY = 0;
  x = 0;
  y = 0;
  rows = 0;
  cols = 0;
  charWidth = 0;
  charHeight = 0;
  inputMode = false;
  onInputDone: any;
  inputStr: number | string = 0;
  inputPos = 0;

  width: number;
  height: number;

  recording: boolean;
  recorded = "";

  readonly characterImageGenerator: CharacterImageGenerator;
  constructor(public canvas: HTMLCanvasElement) {
    this.canvas.width = 640;
    this.canvas.height = 400;
    this.canvas.tabIndex = 0;
    this.ctx = this.canvas.getContext("2d")!;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    // this.charImg = document.createElement("img");
    // this.charImg.setAttribute("src", ScriptSrc + "charmap.png");

    globalConsole = this;

    // this.keyBuffer = [];
    this.reset(false);

    // this.hasFocus = false;

    var self = this;

    window.onkeydown = (event: KeyboardEvent) => {
      if (this.hasFocus) {
        this.onKeyDown(event);
        event.preventDefault();
        // return false;
      }
      // return
    };

    //$(window).keydown(function (event) {
    //    if (self.hasFocus) {
    //        self.onKeyDown(event);
    //        event.preventDefault();
    //        return false;
    //    }
    //});

    canvas.onclick = event => {
      canvas.style.borderColor = "#008800";
      // $(canvas).focus();
      canvas.focus();
      self.hasFocus = true;
      event.stopPropagation();
    };
    //$(canvas).click(function (event) {
    //    canvas.style.borderColor = "#008800";
    //    $(canvas).focus();
    //    self.hasFocus = true;
    //    event.stopPropagation();
    //});

    window.onclick = (_event: MouseEvent) => {
      this.hasFocus = false;
      canvas.style.borderColor = "rgba(14,99,156,0.8)";
    };
    //$(window).click(function (event) {
    //    self.hasFocus = false;
    //    canvas.style.borderColor = "#888888";
    //});
    canvas.style.borderWidth = "1px";
    // $(canvas).css("border-width", "5px");
    canvas.style.borderColor = "#888888";
    // $(canvas).css("border-color", "#888888");
    canvas.style.borderStyle = "solid";
    // $(canvas).css("border-style", "solid");

    this.cls();

    this.characterImageGenerator = new CharacterImageGenerator(
      this.charWidth,
      this.charHeight
    );
  }

  Colours = [
    "#000000", // Black
    "#000088", // Dark Blue
    "#008800", // Green
    "#008888", // Dark Cyan
    "#880000", // Dark Red
    "#880088", // Dark Magenta
    "#884400", // Brown
    "#888888", // Grey
    "#444444", // Charcoal
    "#0000ff", // Blue
    "#00ff00", // Green
    "#00ffff", // Cyan
    "#ff0000", // Red
    "#ff00ff", // Magenta
    "#ffff00", // Yellow
    "#ffffff" // White
  ];

  ScreenDimensions: any = {
    1: { width: 320, height: 200 },
    2: { width: 640, height: 200 },
    3: { width: 720, height: 348 },
    4: { width: 640, height: 400 },
    7: { width: 320, height: 200 },
    8: { width: 640, height: 200 },
    9: { width: 640, height: 350 },
    10: { width: 640, height: 350 },
    11: { width: 640, height: 480 },
    12: { width: 640, height: 480 },
    13: { width: 320, height: 200 }
  };

  reset(testMode = false) {
    this.fgcolourNum = 7;
    this.bgcolourNum = 0;
    this.bgcolour = this.Colours[this.bgcolourNum];
    this.fgcolour = this.Colours[this.fgcolourNum];
    this.curX = 0;
    this.curY = 0;
    this.x = 0;
    this.y = 0;

    this.rows = 25;
    this.cols = 80;
    this.charWidth = 8;
    this.charHeight = 16;

    this.inputMode = false;
    this.onInputDone = null;
    this.inputStr = 0;
    this.inputPos = 0;
    this.width = this.cols * this.charWidth;
    this.height = this.rows * this.charHeight;

    this.cls();
    this.recording = testMode;
    // this.recorded = "";
  }

  record(str: string) {
    if (this.recording) {
      this.recorded += str;
    }
  }

  printError(str: string) {
    if (this.recording) {
      return;
    }
    this.print(str);
  }

  setKeyBuffer(str: string) {
    this.keyBuffer.length = 0;
    for (var i = 0; i < str.length; i++) {
      this.keyBuffer.push(str.charCodeAt(i));
    }
  }

  screen(num: number) {
    var dimensions = this.ScreenDimensions[num];
    if (dimensions === undefined) {
      return false;
    }

    this.cursor(false);

    // $(this.canvas).width(dimensions.width);
    this.canvas.width = dimensions.width;
    //$(this.canvas).height(dimensions.height);
    this.canvas.height = dimensions.height;

    this.ctx.scale(
      this.width / dimensions.width,
      this.height / dimensions.height
    );

    this.width = dimensions.width;
    this.height = dimensions.height;

    return true;
  }

  line(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.strokeStyle = this.fgcolour;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();

    this.curX = x2;
    this.curY = y2;
  }

  lineTo(x: number, y: number) {
    this.line(this.curX, this.curY, x, y);
  }

  circle(
    x: number,
    y: number,
    radius: number,
    colour: any,
    start: any,
    end: any,
    aspect: any,
    step: any
  ) {
    // all parameters are optional except for x, y, radius, and step.
    if (step) {
      x = this.curX + x;
      y = this.curY + y;
    }

    if (aspect === undefined) {
      aspect = (4 * (this.height / this.width)) / 3;
    }

    this.ctx.save();
    this.ctx.translate(x, y);
    if (aspect > 0) {
      this.ctx.scale(1.0, aspect);
    } else {
      this.ctx.scale(aspect, 1.0);
    }

    if (colour) {
      this.ctx.strokeStyle = this.Colours[colour];
    }

    if (start === undefined) {
      start = 0.0;
    }

    if (end === undefined) {
      end = 2 * Math.PI;
    }

    start = 2 * Math.PI - start;
    end = 2 * Math.PI - end;

    this.ctx.beginPath();
    this.ctx.arc(0, 0, radius, start, end, true);
    this.ctx.stroke();

    this.ctx.restore();
  }

  get(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    step1: number,
    step2: number
  ) {
    var temp;

    if (step1) {
      x1 = this.curX + x1;
      y1 = this.curY + y1;
    }

    if (step2) {
      x1 = this.curX + x2;
      y2 = this.curY + y2;
    }

    if (x1 > x2) {
      temp = x1;
      x1 = x2;
      x2 = temp;
    }

    if (y1 > y2) {
      temp = y1;
      y1 = y2;
      y2 = temp;
    }

    return this.ctx.getImageData(x1, y1, x2 - x1, y2 - y1);
  }

  put(data: ImageData, x: number, y: number) {
    this.ctx.putImageData(data, x, y);
  }

  paint(_x: number, _y: number, colour: any, borderColour: any, _step: number) {
    var image = new ImageManipulator(
      this.ctx.getImageData(0, 0, this.width, this.height)
    );

    dbg.printf("%s\n", image.get(10, 10));
  }

  cls() {
    this.record("[CLS]");
    this.cursor(false);
    this.x = 0;
    this.y = 0;
    this.ctx.fillStyle = this.bgcolour;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  locate(row: number, col: number) {
    this.record("[L" + row + "," + col + "]");
    this.cursor(false);
    this.x = Math.floor(col) - 1;
    this.y = Math.floor(row) - 1;
  }

  color(fg = this.fgcolourNum, bg = this.bgcolourNum) {
    this.record("[C" + fg);
    this.record("," + bg);
    this.record("]\n");

    this.fgcolourNum = fg;
    this.fgcolour = this.Colours[fg];
    this.bgcolourNum = bg;
    this.bgcolour = this.Colours[bg];
  }

  scroll() {
    this.cursor(false);
    this.ctx.drawImage(
      this.canvas,
      0,
      this.charHeight,
      this.width,
      this.height - this.charHeight,
      0,
      0,
      this.width,
      this.height - this.charHeight
    );
    this.ctx.fillStyle = this.bgcolour;
    this.ctx.fillRect(
      0,
      this.height - this.charHeight,
      this.width,
      this.charHeight
    );
    this.y -= 1;
  }

  input(onInputDone: (input: string) => void) {
    if (this.recording) {
      var str = "";
      while (this.keyBuffer.length > 0) {
        str += String.fromCharCode(this.keyBuffer.shift());
      }

      onInputDone(str);
    } else {
      this.enableCursor(true);
      this.onInputDone = onInputDone;
      this.inputMode = true;
      this.inputStr = "";
      this.inputPos = 0;
    }
  }

  backup(num: number) {
    this.cursor(false);

    this.x -= num;
    while (this.x < 0) {
      this.y -= 1;
      this.x += this.cols;
    }

    if (this.y < 0) {
      this.y = 0;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.inputMode) {
      // if input position is at least 1,
      if ((<string>this.inputStr).length > 0) {
        // if it's backspace,
        if (event.keyCode == 8) {
          this.inputStr = (<string>this.inputStr).substr(
            0,
            (<string>this.inputStr).length - 1
          );
          this.backup(1);
          this.print(" ");
          this.backup(1);
        }
      }

      if (event.keyCode === 13) {
        // done
        this.inputMode = false;
        this.print("\n");
        this.enableCursor(false);
        this.onInputDone(this.inputStr);
      }

      if (event.keyCode >= 32 && event.keyCode <= 126) {
        // insert the character at the string position, and increment input
        // position.
        var ch = String.fromCharCode(event.keyCode);
        this.inputStr += ch;
        this.inputPos += 1;
        this.print(ch);
      }
    } else {
      var SpecialChars: INumberDictionary<number> = {
        37: 75, // left
        38: 72, // up
        39: 77, // right
        40: 80 // down
      };

      if (event.keyCode in SpecialChars) {
        this.keyBuffer.push(0);
        this.keyBuffer.push(SpecialChars[event.keyCode]);
      } else {
        this.keyBuffer.push(event.keyCode);
      }
    }
  }

  getKeyFromBuffer() {
    if (this.keyBuffer.length > 0) {
      return this.keyBuffer.shift();
    } else {
      return -1;
    }
  }

  enableCursor(enabled: any) {
    if (enabled && !this.cursorEnabled) {
      this.interval = window.setInterval(() => {
        this.toggleCursor();
      }, 500);
      this.cursor(true);
    } else {
      window.clearInterval(this.interval);
      this.cursor(false);
    }

    this.cursorEnabled = enabled;
  }

  toggleCursor() {
    this.cursor(!this.cursorShown);
  }

  cursor(show: boolean) {
    const ctx = this.ctx;
    if (show == this.cursorShown) {
      return;
    }

    ctx.save();
    {
      if (show) {
        this.ctx.fillStyle = this.fgcolour;
        this.ctx.fillRect(
          this.x * this.charWidth,
          this.y * this.charHeight + this.charHeight - 2,
          this.charWidth,
          2
        );
      } else {
        this.ctx.fillStyle = this.bgcolour;
        this.ctx.fillRect(
          this.x * this.charWidth,
          this.y * this.charHeight + this.charHeight - 2,
          this.charWidth,
          2
        );
      }
    }
    ctx.restore();
    this.cursorShown = show;
  }

  newline() {
    this.x = 0;
    this.y += 1;
  }

  print(str: string) {
    if (this.recording) {
      this.recorded += str;
    }

    this.cursor(false);

    const bgcolour = this.bgcolour;
    const fgcolour = this.fgcolour;
    const ctx = this.ctx;
    ctx.fillStyle = bgcolour;
    ctx.font = "16px Consolas";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const characterImageGenerator = this.characterImageGenerator;
    for (var i = 0; i < str.length; i++) {
      if (this.y == this.rows) {
        this.scroll();
      }

      if (str[i] == "\n") {
        this.newline();
      } else {
        ctx.fillStyle = bgcolour;

        ctx.drawImage(
          characterImageGenerator.toImage(" ", fgcolour, bgcolour),
          this.x * this.charWidth,
          this.y * this.charHeight
        );

        ctx.fillStyle = fgcolour;
        {
          ctx.drawImage(
            characterImageGenerator.toImage(str[i], fgcolour, bgcolour),
            this.x * this.charWidth,
            this.y * this.charHeight
          );
        }
        ctx.fillStyle = bgcolour;

        this.x += 1;
        if (this.x == this.cols) {
          this.newline();
        }
      }
    }
  }
}
