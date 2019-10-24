import { IStringDictionary } from "../base/common/collections";

interface Position {
  lineNumber: number;
  column: number;
}

interface Buffer {
  getValue: () => string;
  setValue: (value: string) => void;
  getLineContent: (lineNumber: number) => string;
  getLineCount: () => number;
}

interface FileStream {
  // view: View;
  buffer: Buffer;
  position: Position;
}

const files: IStringDictionary<FileStream> = {};

// let tabGroups: Group[];
// export function setTabGroups(grougps: Group[]) {
//   tabGroups = grougps;
// }

let openFileFunc = (name: string, fileNumber: string) => {};

export function openFile(name: string, fileNumber: string) {
  openFileFunc(name, fileNumber);
}
export function setOpenFile(func: (name: string, fileNumber: string) => void) {
  openFileFunc = func;
}

export function setFileStream(buffer: Buffer, fileNumber: string) {
  const file: FileStream = {
    buffer: buffer,
    position: { lineNumber: 1, column: 0 }
  };
  files[fileNumber] = file;
}
// export function openFile(name: string, fileNumber: string) {
//   // let tabGroups = appStore.getTabGroups();
//   for (const group of tabGroups) {
//     for (const view of group.views) {
//       if (view.getName() === name) {
//         const file: FileStream = {
//           view: view,
//           position: { lineNumber: 1, column: 0 }
//         };
//         files[fileNumber] = file;
//         return;
//       }
//     }
//   }
// }

export function getFile(fileNumber: string) {
  return files[fileNumber];
}

export function getLineContent(index: string, lineNumber: number) {
  const file = files[index];
  const buffer = file.buffer;
  const lineContent = buffer.getLineContent(lineNumber);
  return lineContent;
}

export function setLineContent(index: string, lineContent: string) {
  const file = files[index];
  const lineNumber = file.position.lineNumber;
  // const buffer = file.view.file.getBuffer();
  // const lineContent = buffer.getLineContent(lineNumber);
  const value = file.buffer.getValue();
  const splits = value.split(/\n/);

  if (splits.length < lineNumber) {
    for (let i = 0; i < lineNumber - splits.length; ++i) splits.push("");
  }
  splits[lineNumber - 1] = lineContent;
  // ToDo : もっとシンプルに！
  const result = splits.join("\n");
  // buffer.setValue(result);
  file.buffer.setValue(result);
  file.position.lineNumber++;
}

export function setSeekPosition(index: string, position: Position) {
  const fileStream = files[index];
  fileStream.position = position;
}
