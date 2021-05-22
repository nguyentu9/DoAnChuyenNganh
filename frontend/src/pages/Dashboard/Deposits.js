import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <>
      <Title>Số bài báo đã gửi</Title>
      <Typography component="p" variant="h2">
        3
      </Typography>
    </>
  );
}