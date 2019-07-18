import * as React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
// import { VirtualList, ItemStyle } from "../../src";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";

const { useEffect, useRef } = React;

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
    }
  })
);

// props の型を定義
type Props = {
  title?: string;
};

// コンポーネントを定義
function Example1({ title }: Props) {
  // ここでクラス名を取得
  const classes = useStyles({});
  const [itemSize, setItemSize] = React.useState<number | number[]>(50);
  const handleChange = (event: any, newValue: number | number[]) => {
    setItemSize(newValue < 18 ? 18 : newValue);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" noWrap>
        QuickBASIC
      </Typography>
      <hr></hr>
      <Typography variant="h6">
        <p>QuickBasic are programming languages for beginners.</p>
      </Typography>
    </div>
  );
}

export default Example1;
