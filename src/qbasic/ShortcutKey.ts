//import { editor } from "./qb";
//import { selectBasicCodeTab } from "../Tabs/Tabs";
//import { KeyCode } from "../common/keyCodes";
//import * as WindowsStorage from "../lib/WindowsStorage";

//document.addEventListener("keydown", (ev) => {
//    switch (ev.keyCode) {
//        case KeyCode.KEY_N: // Register Ctrl-N for new file
//            if (ev.ctrlKey) {
//                editor.setValue("");
//                ev.stopPropagation();
//            }
//            break;
//        case KeyCode.KEY_O: // Register Ctrl-O for file open
//            if (ev.ctrlKey) {
//                WindowsStorage.openFile(editor);
//                selectBasicCodeTab();
//                ev.stopPropagation();
//            }
//            break;
//        case KeyCode.KEY_S: // Register Ctrl-S for Save
//            if (ev.ctrlKey) {
//                if (ev.shiftKey) {
//                    editor.save(true, () => { }, () => { });
//                    ev.stopPropagation();
//                } else {
//                    editor.save(false, () => { }, () => { });
//                    ev.stopPropagation();
//                }
//            }
//            break;
//        default:
//            break;
//    }
//}, false);