import { Button, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RequireEditingDialog from './RequireEditingDialog';
import AssignReviewerDialog from './AssignReviewerDialog';
import RejectDialog from './RejectDialog';
import PublishArticleDialog from './PublishArticleDialog';

const statusCodeForBtn = {
    btnEditorReview: 1, //submitted
    btnRequireEditing: 5,
    btnAssignReviewer: 2, // inreview
    btnPublish: 7,
    btnReject: 8,
};

function EditorButtonGroup({ status, handleClick }) {
    const classes = useStyles();
    const [btnEditorReview, setBtnEditorReview] = useState(true);
    const [btnRequireEditing, setBtnRequireEditing] = useState(false);
    const [btnAssignReviewer, setBtnAssignReviewer] = useState(false);
    const [btnPublish, setBtnPublish] = useState(false);
    const [btnReject, setBtnReject] = useState(false);

    useEffect(() => {
        let lastStatus = status?.slice(-1)[0];

        if (lastStatus?.id === statusCodeForBtn['btnEditorReview']) {
            setBtnEditorReview(false);
            setBtnRequireEditing(true);
            setBtnAssignReviewer(true);
            setBtnPublish(false);
            setBtnReject(true);
        }
        if (lastStatus?.id === statusCodeForBtn['btnRequireEditing']) {
            setBtnEditorReview(false);
            setBtnRequireEditing(false);
            setBtnAssignReviewer(false);
            setBtnPublish(false);
            setBtnReject(true);
        }

        if (lastStatus?.id === statusCodeForBtn['btnAssignReviewer']) {
            setBtnEditorReview(false);
            setBtnRequireEditing(false);
            setBtnAssignReviewer(false);
            setBtnPublish(false);
            setBtnReject(true);
        }
        if (lastStatus?.id === statusCodeForBtn['btnPublish']) {
            setBtnEditorReview(false);
            setBtnRequireEditing(false);
            setBtnAssignReviewer(false);
            setBtnPublish(false);
            setBtnReject(false);
        }

        if (lastStatus?.id === statusCodeForBtn['btnReject']) {
            setBtnEditorReview(false);
            setBtnRequireEditing(false);
            setBtnAssignReviewer(false);
            setBtnPublish(false);
            setBtnReject(false);
        }
    }, [status]);

    const handleOnClick = btn => async _ => {
        let { message, reviewers } = _;
        let statusCode = statusCodeForBtn[btn];
        handleClick({ role: 'editor', statusCode, message, reviewers });
    };

    return (
        <Grid container item direction={'row'} justify={'center'}>
            <Button
                variant='contained'
                size='small'
                color='primary'
                disabled={!btnEditorReview}
                className={classes.button}
                onClick={handleOnClick('btnEditorReview')}
            >
                Duyệt bài
            </Button>
            <RequireEditingDialog
                variant='contained'
                color='primary'
                size='small'
                disabled={!btnRequireEditing}
                className={classes.button}
                handleonclick={handleOnClick('btnRequireEditing')}
            >
                Yêu cầu chỉnh sửa
            </RequireEditingDialog>
            <AssignReviewerDialog
                variant='contained'
                color='primary'
                size='small'
                disabled={!btnAssignReviewer}
                className={classes.button}
                handleonclick={handleOnClick('btnAssignReviewer')}
            >
                Phân công phản biện
            </AssignReviewerDialog>

            <PublishArticleDialog
                variant='contained'
                color='primary'
                size='small'
                disabled={!btnPublish}
                className={classes.button}
                handleonclick={handleOnClick('btnPublish')}
            >
                Đăng bài
            </PublishArticleDialog>
            <RejectDialog
                variant='contained'
                color='secondary'
                size='small'
                disabled={!btnReject}
                className={classes.button}
                handleonclick={handleOnClick('btnReject')}
            >
                Từ chối xuất bản
            </RejectDialog>
        </Grid>
    );
}

export default EditorButtonGroup;

const useStyles = makeStyles(theme => ({
    button: {
        margin: '1rem .25rem 0',
    },
}));
