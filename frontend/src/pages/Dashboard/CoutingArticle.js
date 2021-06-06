import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function CoutingArticle() {
    return (
        <>
            <Typography
                component='h2'
                variant='h6'
                color='primary'
                gutterBottom
            >
                Số bài báo đã gửi
            </Typography>
            <Typography component='p' variant='h2'>
                3
            </Typography>
        </>
    );
}
