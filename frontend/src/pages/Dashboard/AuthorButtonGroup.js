import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
function AuthorButtonGroup() {
    const classes = useStyles();
    return (
        <Grid item>
            <Button
                variant='contained'
                size='small'
                color='primary'
                className={classes.button}
            >
                Duyệt bài
            </Button>
            <Button
                variant='contained'
                color='primary'
                size='small'
                className={classes.button}
            >
                Yêu cầu chỉnh sửa
            </Button>
            <Button
                variant='contained'
                color='primary'
                size='small'
                className={classes.button}
            >
                Phân công phản biện
            </Button>
            <Button
                variant='contained'
                color='primary'
                size='small'
                className={classes.button}
            >
                Đăng bài
            </Button>
            <Button
                variant='contained'
                color='secondary'
                size='small'
                className={classes.button}
            >
                Từ chối xuất bản
            </Button>
        </Grid>
    );
}

export default AuthorButtonGroup;

const useStyles = makeStyles(theme => ({
    button: {
        margin: '1rem .25rem 0',
    },
}));
