import { Button, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RequireEditingDialog from './RequireEditingDialog';
import AssignReviewerDialog from './AssignReviewerDialog';
import articleApi from '../../../../api/articleApi';
import { useLocation } from 'react-router-dom';

const statusCodeForBtn = {
    btnEditorReview: 1, //submitted
    btnRequireEditing: 5,
    btnAssignReviewer: 2, // inreview
    btnPublish: 7,
    btnReject: 8,
};

function EditorButtonGroup({ status, handleClick }) {
    const location = useLocation();
    const classes = useStyles();
    const [btnEditorReview, setBtnEditorReview] = useState(true);
    const [btnRequireEditing, setBtnRequireEditing] = useState(false);
    const [btnAssignReviewer, setBtnAssignReviewer] = useState(false);
    const [btnPublish, setBtnPublish] = useState(false);
    const [btnReject, setBtnReject] = useState(true);

    useEffect(() => {
        let lastStatus = status?.slice(-1)[0];

        if (lastStatus?.id === 1) {
            setBtnEditorReview(false);
            setBtnRequireEditing(true);
            setBtnAssignReviewer(true);
            setBtnPublish(false);
            setBtnReject(true);
        }
        if (lastStatus?.id === 5) {
            setBtnEditorReview(false);
            setBtnRequireEditing(false);
            setBtnAssignReviewer(false);
            setBtnPublish(false);
            setBtnReject(true);
        }
        if (lastStatus?.id === 8) {
            setBtnEditorReview(false);
            setBtnRequireEditing(false);
            setBtnAssignReviewer(false);
            setBtnPublish(false);
            setBtnReject(false);
        }
    }, [status]);

    const handleOnClick = btn => async _ => {
        const articleID = location.pathname.split('/').pop();
        if (btn === 'btnRequireEditing' && _?.message) {
            let message = _.message;
            try {
                const data = await articleApi.putStatusCode(
                    articleID,
                    'editor',
                    JSON.stringify({
                        message,
                        statusCode: statusCodeForBtn[btn],
                    })
                );
            } catch (e) {
                console.log(e);
            }
        }

        if (btn === 'btnReject' && _?.message) {
        }
        // let dialog = [
        //     'btnRequireEditing',
        //     'btnAssignReviewer',
        //     'btnReject',
        // ].includes(btn)
        //     ? btn
        //     : '';

        // let statusCode = statusCodeForBtn[btn];
        // handleClick({ statusCode, role: 'editor', dialog });
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

            <Button
                variant='contained'
                color='primary'
                size='small'
                disabled={!btnPublish}
                className={classes.button}
                onClick={handleOnClick('btnPublish')}
            >
                Đăng bài
            </Button>
            <Button
                variant='contained'
                color='secondary'
                size='small'
                disabled={!btnReject}
                className={classes.button}
                onClick={handleOnClick('btnReject')}
            >
                Từ chối xuất bản
            </Button>
        </Grid>
    );
}

export default EditorButtonGroup;

const useStyles = makeStyles(theme => ({
    button: {
        margin: '1rem .25rem 0',
    },
}));
