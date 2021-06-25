import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ArticleItem from './ArticleItem';

function Article({ title, listArticle, slug }) {
    const classes = useStyles();
    return (
        <Paper elevation={2} className={classes.paper}>
            <Typography variant='h6' className={classes.typo}>
                {' '}
                {title}{' '}
            </Typography>
            {listArticle.map((item, index) => (
                <ArticleItem
                    key={index}
                    articleTitle={'Example'}
                    author={'John'}
                    articleNum={0}
                    articleDate={''}
                    imgUrl={''}
                />
            ))}

            {/* imgUrl={''} */}
            <ArticleItem
                articleTitle={'Example'}
                author={''}
                articleNum={0}
                articleDate={''}
            />
            <ArticleItem
                articleTitle={'Example'}
                author={''}
                articleNum={0}
                articleDate={''}
            />
            <ArticleItem
                articleTitle={'Example'}
                author={''}
                articleNum={0}
                articleDate={''}
            />

            <Typography variant='button'>
                <Link to={slug} className={classes.link} underline='none'>
                    Xem thêm
                </Link>
            </Typography>
        </Paper>
    );
}

export default Article;

Article.propTypes = {
    title: PropTypes.string.isRequired,
    listArticle: PropTypes.array.isRequired,
};

Article.defaultProps = {
    title: '',
    listArticle: [],
};

const useStyles = makeStyles({
    paper: {
        boxSizing: 'border-box',
    },
    card: {
        margin: '0 0 1rem 2rem',
    },
    cardContent: {
        padding: '0 .5rem 0',
    },
    img: {
        width: '100px',
        height: '150px',
        borderRadius: '5px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    link: {
        display: 'flex',
        padding: '.5rem 0',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '7rem',
        marginLeft: 'auto',
        textDecoration: 'none',
    },
    typo: {
        padding: '1rem',
        textTransform: 'uppercase',
    },
});
