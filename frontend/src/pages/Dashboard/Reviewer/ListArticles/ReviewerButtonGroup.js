import { Button, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DecisionDialog from './DecisionDialog';
const statusCodeForBtn = {
    btnAgree: 3,
    btnDisgree: 4,
};

function ReviewerButtonGroup({ status, handleClick }) {
    const [btnAgree, setBtnAgree] = useState(true);
    const [btnDisagree, setBtnDisagree] = useState(true);

    const classes = useStyles();

    useEffect(() => {
        let lastStatus = status?.slice(-1)[0];

        if (lastStatus?.id === statusCodeForBtn['btnAgree']) {
            setBtnAgree(false);
            setBtnDisagree(false);
        }
        if (lastStatus?.id === statusCodeForBtn['btnDisgree']) {
            setBtnAgree(false);
            setBtnDisagree(false);
        }
    }, [status]);

    const handleOnClick = btn => async _ => {
        let { message } = _;
        let statusCode = statusCodeForBtn[btn];

        handleClick({ role: 'reviewer', statusCode, message });
    };

    return (
        <Grid container item direction={'row'} justify={'center'}>
            <DecisionDialog
                variant='contained'
                size='small'
                color='primary'
                disabled={!btnAgree}
                className={classes.button}
                handleonclick={handleOnClick('btnAgree')}
            >
                Chấp nhận
            </DecisionDialog>
            <DecisionDialog
                variant='contained'
                color='secondary'
                size='small'
                disabled={!btnDisagree}
                className={classes.button}
                handleonclick={handleOnClick('btnDisgree')}
            >
                Không chấp nhận
            </DecisionDialog>
        </Grid>
    );
}

export default ReviewerButtonGroup;

const useStyles = makeStyles(theme => ({
    button: {
        margin: '1rem .25rem 0',
    },
}));
