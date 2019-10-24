// import { IStringDictionary } from "../base/common/collections";
// import appStore from "../../stores/AppStore";
// import { View } from "../../components/editor/View";
// import Group from "../../utils/group";

interface Position {
  lineNumber: number;
  column: number;
}

interface IView {
  getLineCount: () => number;
  getValue: () => string;
  getBuffer: () => { getLineContent: (line: number) => string };
}

interface FileStream {
  view: IView;
  position: Position;
}

const files: { [key: string]: FileStream } = {};

// let tabGroups: Group[];
// export function setTabGroups(grougps: Group[]) {
// tabGroups = grougps;
// }

export function openFile(name: string, fileNumber: string) {
  // let tabGroups = appStore.getTabGroups();
  // for (const group of tabGroups) {
  //   for (const view of group.views) {
  //     if (view.getName() === name) {
  //       const file: FileStream = {
  //         view: view,
  //         position: { lineNumber: 1, column: 0 }
  //       };
  //       files[fileNumber] = file;
  //       return;
  //     }
  //   }
  // }
}

export function getFile(fileNumber: string) {
  return files[fileNumber];
}

export function getLineContent(index: string, lineNumber: number) {
  // const file = files[index];
  // const buffer = file.view.file.getBuffer();
  // const lineContent = buffer.getLineContent(lineNumber);
  // return lineContent;
}

export function setLineContent(index: string, lineContent: string) {
  // const file = files[index];
  // const lineNumber = file.position.lineNumber;
  // const buffer = file.view.file.getBuffer();
  // // const lineContent = buffer.getLineContent(lineNumber);
  // const value = file.view.getValue();
  // const splits = value.split(/\n/);
  // if (splits.length < lineNumber) {
  //   for (let i = 0; i < lineNumber - splits.length; ++i) splits.push("");
  // }
  // splits[lineNumber - 1] = lineContent;
  // // ToDo : もっとシンプルに！
  // const result = splits.join("\n");
  // buffer.setValue(result);
  // file.position.lineNumber++;
}

export function setSeekPosition(index: string, position: Position) {
  const fileStream = files[index];
  fileStream.position = position;
}
