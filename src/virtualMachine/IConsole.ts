export default interface IConsole {
  x: number;
  text?: string;
  input: (onInputDone: (input: string) => void) => void;
  color: (fg: number, bg: number) => void;
  print: (str: string) => void;
  reset: (testMode?: boolean) => void;
  locate: (row: number, col: number) => void;
  cls: () => void;
  getKeyFromBuffer: () => number;
}

export class DummyConsole implements IConsole {
  x: number;
  public text = '';
  input(onInputDone: (input: string) => void) {}
  color(fg: number, bg: number) {}
  print(str: string) {
    this.text += str;
  }
  reset(testMode?: boolean) {}
  locate(row: number, col: number) {}
  cls() {}
  getKeyFromBuffer() {
    return -1;
  }
}
