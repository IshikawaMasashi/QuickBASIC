import * as React from "react";
import { useEffect, useRef } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { _Console } from "../../src";
import { compile2 } from "../../src";
import { VirtualMachine } from "../../src";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import SyntaxHighlighter from "./SyntaxHighlighter";
import Monaco from "./monaco";

// スタイルを定義
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(6)
    },
    title: {
      borderBottom: `2px solid ${theme.palette.primary.main}`
    },
    paper: {
      padding: 18
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

// props の型を定義
type Props = {};

// コンポーネントを定義
function Example2({}: Props) {
  // ここでクラス名を取得
  const classes = useStyles({});
  const model = monaco.editor.createModel(`PRINT "Hello World"`);

  const consRef = useRef<_Console>();
  const virtualMachineRef = useRef<VirtualMachine>();
  const refCanvas = useRef<HTMLCanvasElement>(null);

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // const code = editorRef.current!.getValue();
    const code = model.getValue();
    const quickBasicProgram = compile2(code);
    if (quickBasicProgram.errors.length === 0) {
      virtualMachineRef.current.run(quickBasicProgram, false);
    }
  }

  useEffect(() => {
    if (!refCanvas.current) {
      return;
    }

    if (!consRef.current) {
      consRef.current = new _Console(refCanvas.current);
    }

    if (!virtualMachineRef.current) {
      virtualMachineRef.current = new VirtualMachine(consRef.current);
    }

    return () => {};
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography variant="h6" noWrap>
        1. HELLO.BAS
      </Typography>
      <hr></hr>
      <SyntaxHighlighter
        language="basic"
        code={`PRINT "Hello World"`}
      ></SyntaxHighlighter>
      <hr></hr>
      <Grid container spacing={2}>
        <Grid item xs>
          <Button
            variant="contained"
            className={classes.button}
            onClick={onClick}
          >
            Run
          </Button>
        </Grid>
      </Grid>

      <div style={{ display: "flex" }}>
        <Monaco model={model} />
        <canvas
          ref={refCanvas}
          className="quick-basic-console-dialog__canvas"
        />
      </div>
      <Typography variant="h6" noWrap>
        PRINT
      </Typography>
      <hr></hr>
      <p>
        PRINT is QBasic's text output function. PRINT is a QBasic function that
        requires arguments. The argument in the Hello World program we just ran
        were the words "Hello World". So, PRINT is the function and "Hello
        World" is the argument we pass-to the function.
      </p>
      <p>PRINT [Text to screen]</p>
    </Paper>
  );
}

export default Example2;
