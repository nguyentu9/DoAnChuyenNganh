import React, { useEffect, useState } from 'react';
import TableArticle from '../../TableArticle';
import articleApi from '../../../../api/articleApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../redux/auth';
import { useHistory } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
function ListArticlesReviewed() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchAllArticles() {
            try {
                const data = await articleApi.getAllWithUser('reviewer');
                setArticles(data ? data : []);
            } catch (e) {
                dispatch(logout());
                return history.replace('/dang-nhap');
            }
        }
        fetchAllArticles();
    }, [history, dispatch]);

    return (
        <>
            <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
            >
                <Typography variant='h5' gutterBottom>
                    BÀI BÁO ĐÃ PHẢN BIỆN
                </Typography>
                {articles && <TableArticle articles={articles} />}
            </Grid>
        </>
    );
}

export default ListArticlesReviewed;
