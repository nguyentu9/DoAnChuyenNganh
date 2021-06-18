import { Grid, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    gridLabel: {
        padding: '0.85rem 0',
    },
    gridBody: {
        padding: '0.9rem 0',
    },
}));

function ArticleDetail() {
    const classes = useStyles();
    const history = useHistory();
    const { articleID } = useParams();

    const handleGoBack = () => {
        history.goBack();
    };
    return (
        <Grid container direction={'column'} alignItems={'center'}>
            <Grid container item xs={12}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleGoBack}
                >
                    Trở về
                </Button>
            </Grid>
            <Typography variant='h5' gutterBottom>
                CHI TIẾT BÀI BÁO
            </Typography>
            <Grid container item xs={12}>
                <Grid item sx={6} sm={4} className={classes.gridLabel}>
                    <h4>Mã bài báo</h4>
                </Grid>
                <Grid item sx={6} sm={8} className={classes.gridBody}>
                    {articleID}
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item sx={6} sm={4} className={classes.gridLabel}>
                    <h4>Tên bài báo</h4>
                </Grid>
                <Grid item sx={6} sm={8} className={classes.gridBody}>
                    {articleID}
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item sx={6} sm={4} className={classes.gridLabel}>
                    <h4>Mã bài báo</h4>
                </Grid>
                <Grid item sx={6} sm={8} className={classes.gridBody}>
                    {articleID}
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item sx={6} sm={4} className={classes.gridLabel}>
                    <h4>Tóm tắt</h4>
                </Grid>
                <Grid item sx={6} sm={8} className={classes.gridBody}>
                    {articleID}
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item sx={6} sm={4} className={classes.gridLabel}>
                    <h4>Từ khoá</h4>
                </Grid>
                <Grid item sx={6} sm={8} className={classes.gridBody}>
                    {articleID}
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item sx={6} sm={4} className={classes.gridLabel}>
                    <h4>Từ khoá</h4>
                </Grid>
                <Grid item sx={6} sm={8} className={classes.gridBody}>
                    {articleID}
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item sx={6} sm={4} className={classes.gridLabel}>
                    <h4>Tác giả/đồng tác giả</h4>
                </Grid>
                <Grid item sx={6} sm={8} className={classes.gridBody}>
                    {articleID}
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item sx={6} sm={4} className={classes.gridLabel}>
                    <h4>Danh sách tập tin đính kèm:</h4>
                </Grid>
                <Grid item sx={6} sm={8} className={classes.gridBody}>
                    {articleID}
                </Grid>
            </Grid>
            <Grid container item xs={12}></Grid>
        </Grid>
    );
}

export default ArticleDetail;
