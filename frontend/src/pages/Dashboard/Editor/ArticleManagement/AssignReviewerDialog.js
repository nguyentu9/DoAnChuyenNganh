import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import VirtualizedCheckbox from 'react-virtualized-checkbox';
import { Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import reviewerApi from '../../../../api/reviewerApi';
import articleApi from '../../../../api/articleApi';
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        height: 400,
    },
    paper: { minWidth: '500px', width: '900px' },
}));

export default function AssignReviewerDialog(props) {
    const classes = useStyles();
    const location = useLocation();
    const {
        handleonclick,
        children,
        className,
        color,
        disabled,
        size,
        variant,
    } = props;
    const [open, setOpen] = useState(false);
    const [reviewers, setReviewers] = useState([]);
    const [checkedReviewers, setCheckedReviewers] = useState([]);
    const articleID = location.pathname.split('/').slice(-1)[0];
    useEffect(() => {
        async function fetchAllReviewer() {
            try {
                const data = await reviewerApi.getAll({ articleID });
                setReviewers(data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchAllReviewer();
    }, [location.pathname]);

    useEffect(() => {
        async function fetchExistsReviewer() {
            try {
                const reviewers = await articleApi.getReviewers(articleID);
                if (reviewers.length > 0) setCheckedReviewers(reviewers);
            } catch (e) {
                console.error(e);
            }
        }
        fetchExistsReviewer();
    }, [location.pathname]);

    const handleOnClickOpen = () => {
        setOpen(true);
    };
    const handleOnClose = () => {
        setCheckedReviewers([]);
        setOpen(false);
    };
    const handleOnSendPost = () => {
        let reviewers = checkedReviewers.map(i => i.value);
        if (reviewers) handleonclick({ reviewers });
        setOpen(false);
        setCheckedReviewers([]);
    };

    const listReviewers = () => {
        return reviewers.map((reviewer, i) => {
            const { _id, fullName, email, major, org } = reviewer;
            return {
                label: `${fullName} | ${email} | ${major} | ${org}`,
                value: { _id, fullName },
                checked: false,
            };
        });
    };
    return (
        <div>
            <Button
                onClick={handleOnClickOpen}
                className={className}
                color={color}
                disabled={disabled}
                size={size}
                variant={variant}
            >
                {children}
            </Button>
            <Dialog
                classes={{ paper: classes.paper }}
                open={open}
                onClose={handleOnClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle id='form-dialog-title'>
                    DANH SÁCH PHẢN BIỆN
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Chọn người phản biện để bình duyệt
                    </DialogContentText>
                    <Grid container className={classes.root}>
                        <Grid
                            item
                            style={{
                                minWidth: '100%',
                                height: '300',
                            }}
                        >
                            {reviewers && (
                                <VirtualizedCheckbox
                                    items={listReviewers()}
                                    onOk={checkedItems =>
                                        setCheckedReviewers(checkedItems)
                                    }
                                    onCancel={() => setCheckedReviewers([])}
                                />
                            )}
                        </Grid>
                        <Grid
                            item
                            style={{
                                minWidth: '100%',
                                height: '200',
                                marginTop: '1rem',
                            }}
                        >
                            <h4 style={{ marginBottom: '.5rem' }}>Đã chọn:</h4>
                            {checkedReviewers.map((item, i) => (
                                <p key={i}>
                                    {i + 1}. {item.label}
                                </p>
                            ))}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOnClose} color='primary'>
                        Đóng
                    </Button>
                    <Button
                        onClick={handleOnSendPost}
                        color='primary'
                        disabled={
                            checkedReviewers.length === 0 ||
                            checkedReviewers.length > 2
                        }
                    >
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
