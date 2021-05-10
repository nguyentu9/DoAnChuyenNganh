import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Article from '../components/Article';
import SearchForm from '../components/Common/SearchForm';

function Home() {
    return (
        <>
            <Container>
                <Grid container spacing={6} direction="row-reverse">
                    <Grid item xs={12} md={4}>
                        <SearchForm />
                    </Grid>
                    <Grid item xs={12} md={8} >
                        <Article title={'Bài báo nổi bật'} slug={'/bai-bao-noi-bat'}/>
                    </Grid>

                </Grid>
            </Container>
            <Container>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={8}>
                        <Article title={'Bài báo mới nhất'} slug={'/bai-bao-moi-nhat'} />
                    </Grid>
                </Grid>

            </Container>
        </>
    )
}

export default Home
