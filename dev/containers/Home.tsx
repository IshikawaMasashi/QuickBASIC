import React from 'react';
import { useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useHistory,
  useLocation,
  Link,
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Paper from '@material-ui/core/Paper';
import Info from './Info';
import About from '../components/About';
import Examples from './Examples';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import { _Console } from '../../src';
import { compile2 } from '../../src';
import { VirtualMachine } from '../../src';

import MonacoEditor, {
  MonacoEditorRef,
} from '@ishikawa_masashi/react-monaco-editor';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  toolbar: {
    display: 'flex',
    width: '50%',
    flexDirection: 'row-reverse',
  },
}));

import Box from '@material-ui/core/Box';
import QuickBasic from '../components/quickBasic';
import { EXAMPLES } from '../../src';

export default function Home() {
  const classes = useStyles();

  const location = useLocation();

  const consRef = useRef<_Console>();
  const canvasRef = useRef<HTMLCanvasElement>();
  const monacoEditorRef = useRef<MonacoEditorRef>();
  const virtualMachineRef = useRef<VirtualMachine>();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const value = params.get('value');
    console.log(params.toString());
    console.log(value);
  }, [location]);

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // const code = editorRef.current!.getValue();
    const code = monacoEditorRef.current.getValue();
    const quickBasicProgram = compile2(code);
    if (quickBasicProgram.errors.length === 0) {
      virtualMachineRef.current.run(quickBasicProgram, false);
    }
    for (let i = 0; i < quickBasicProgram.errors.length; i++) {
      consRef.current.print(quickBasicProgram.errors[i] + '\n');
    }
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    if (!consRef.current) {
      consRef.current = new _Console(canvasRef.current);
    }

    if (!virtualMachineRef.current) {
      virtualMachineRef.current = new VirtualMachine(consRef.current);
    }

    monacoEditorRef.current.setValue(EXAMPLES.NIBBLES);
    monacoEditorRef.current.setModelLanguage('quickbasic');

    return () => {};
  }, []);

  return (
    <Paper className={classes.root}>
      <div style={{ display: 'flex' }}>
        <div className={classes.toolbar}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={onClick}
          >
            Run
          </Button>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%', height: 'calc(100vh - 240px)' }}>
          <MonacoEditor ref={monacoEditorRef} />
        </div>
        <div style={{ width: '50%', height: 'calc(100vh - 240px)' }}>
          <canvas ref={canvasRef} />
        </div>
      </div>
    </Paper>
  );
}
