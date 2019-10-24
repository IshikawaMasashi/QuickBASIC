export default class CharacterImageGenerator {
  readonly canvas = document.createElement('canvas');
  readonly context: CanvasRenderingContext2D;
  constructor(readonly charWidth: number, readonly charHeight: number) {
    const canvas = this.canvas;
    canvas.style.position = 'absolute';
    canvas.style.top = '-9999px';
    canvas.style.left = '-9999px';
    canvas.style.fontFamily = '16px Consolas';

    canvas.width = charWidth;
    canvas.height = charHeight;
    canvas.tabIndex = 0;

    this.context = canvas.getContext('2d');
    const context = this.context;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.font = '16px Consolas';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
  }

  //   public clear(backgroundColor: string) {
  //     const context = this.context;
  //     context.fillStyle = backgroundColor;
  //     context.fillRect(0, 0, this.charWidth, this.charHeight);
  //   }
  public toImage(char: string, color: string, backgroundColor: string) {
    const { context, charWidth, charHeight } = this;
    if (char === ' ') {
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, charWidth, charHeight);
      return this.canvas;
    }
    context.fillStyle = color;
    context.fillText(char, charWidth * 0.5, charHeight * 0.5);
    return this.canvas;
  }
}
