import * as React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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
type Props = {};

// コンポーネントを定義
function About({  }: Props) {
  // ここでクラス名を取得
  const classes = useStyles({});

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" noWrap>
        About
      </Typography>
      <hr></hr>
      <Typography variant="h6">
        <p>QuickBasic are programming languages for beginners.</p>
      </Typography>
    </Paper>
  );
}

export default About;
