import { IStringDictionary } from '../base/common/collections';

interface Position {
  lineNumber: number;
  column: number;
}

// interface Buffer {
//   getValue: () => string;
//   setValue: (value: string) => void;
//   getLineContent: (lineNumber: number) => string;
//   getLineCount: () => number;
// }

interface File {
  getLineContent: (lineNumber: number) => string;
  getLineCount: () => number;
  getValue: () => string;
  setValue: (value: string) => void;
}

interface FileStream {
  file: File;
  position: Position;
}

const fileStreams: IStringDictionary<FileStream> = {};

let openFileFunc = (name: string, fileNumber: string) => {};

export function openFile(name: string, fileNumber: string) {
  openFileFunc(name, fileNumber);
}
export function setOpenFile(func: (name: string, fileNumber: string) => void) {
  openFileFunc = func;
}

export function setFileStream(file: File, fileNumber: string) {
  const fileStream: FileStream = {
    file: file,
    position: { lineNumber: 1, column: 1 }
  };
  fileStreams[fileNumber] = fileStream;
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

export function getFileStream(fileNumber: string) {
  return fileStreams[fileNumber];
}

export function getLineContent(index: string, lineNumber: number) {
  const fileStream = fileStreams[index];
  const file = fileStream.file;
  const lineContent = file.getLineContent(lineNumber);
  return lineContent;
}

export function setLineContent(index: string, lineContent: string) {
  const fileStream = fileStreams[index];
  const file = fileStream.file;
  const lineNumber = fileStream.position.lineNumber;
  // const buffer = file.view.file.getBuffer();
  // const lineContent = buffer.getLineContent(lineNumber);
  const value = file.getValue();
  const splits = value.split(/\n/);

  if (splits.length < lineNumber) {
    for (let i = 0; i < lineNumber - splits.length; ++i) splits.push('');
  }
  splits[lineNumber - 1] = lineContent;
  // ToDo : もっとシンプルに！
  const result = splits.join('\n');
  // buffer.setValue(result);
  file.setValue(result);
  fileStream.position.lineNumber++;
}

export function setSeekPosition(index: string, position: Position) {
  const fileStream = fileStreams[index];
  fileStream.position = position;
}
