import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function ArticleItem({ articleTitle, author, articleNum, articleDate, imgUrl }) {
    const classes = useStyles();
    return (
        <Card elevation={0} className={classes.card} >
            <Grid container >
                <Grid item xs={4} sm={2} >
                    <img src={imgUrl} className={classes.img} alt="logo"/>
                </Grid>
                <Grid item xs={8} sm={10}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="button" component="h2">
                            { articleTitle }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Thể loại: 
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="span">
                            {`Thông tin: Số: ${articleNum} (${articleDate}) Trang:`}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Số lượt xem
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Số lượt tải về
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="span">
                            Tác giả: { author}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
}

ArticleItem.propTypes = {
    articleTitle: PropTypes.string.isRequired, 
    author: PropTypes.string.isRequired, 
    articleNum: PropTypes.number.isRequired,
    articleDate: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
}


ArticleItem.defaultProps = {
    articleTitle: '', 
    author: '', 
    articleNum: 0, 
    articleDate: '1/1/1970',
    imgUrl: 'https://picsum.photos/seed/picsum/200/300'
}

export default ArticleItem

const useStyles = makeStyles({
    card: {
        margin:'0 0 1rem 2rem',
        
    },
    cardContent: {
        padding: '0 .5rem 0',
    },
    img: {
        width:'100px', 
        height:'150px',
        borderRadius: '5px',
        backgroundSize:'cover',
        backgroundPosition:'center'
    },
    link: {
        display:'flex', 
        padding: '.5rem 0', 
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '7rem',
        marginLeft: 'auto'
    }
})