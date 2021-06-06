import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Paper, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import SearchForm from '../components/SearchForm';
import TabPanel from '../components/TabPanel';

function ListJournal() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <Container>
            <Grid container spacing={6} direction="row-reverse">

                <Grid item xs={12} md={4} elevation={2}>
                    <SearchForm />
                </Grid>

                <Grid item xs={12} md={8}>

                    <Paper elevation={2}>
                        <Typography variant="h6" className={classes.typo}>Danh sách số tạp chí</Typography>
                        <div className={classes.root}>
                            <AppBar position="static" color="transparent" elevation={0} >
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="scrollable"
                                    scrollButtons="on"
                                    aria-label="scrollable auto tabs example"

                                >
                                    <Tab label="2018" {...a11yProps(0)} classes={{ root: classes.tab }} />
                                    <Tab label="2019" {...a11yProps(1)} classes={{ root: classes.tab }} />
                                    <Tab label="2020" {...a11yProps(2)} classes={{ root: classes.tab }} />
                                    <Tab label="2021" {...a11yProps(3)} classes={{ root: classes.tab }} />
                                    <Tab label="2022" {...a11yProps(4)} classes={{ root: classes.tab }} />
                                    <Tab label="2023" {...a11yProps(5)} classes={{ root: classes.tab }} />
                                </Tabs>
                            </AppBar>

                            <TabPanel value={value} index={0}>
                                <Grid container spacing={2} alignItems="center" justify="center">
                                    <Grid item md={4} sm={6} xs={12}>
                                        <Card>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image="/images/journal.jpg"
                                                    title="Paella dish"
                                                />
                                                <CardContent>
                                                    <Typography variant="subtitle1" component="p" style={{ textAlign: 'center' }}>
                                                        Số 1/2018
                                                </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                    <Grid item md={4} sm={6} xs={12}>
                                        <Card>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image="/images/journal.jpg"
                                                    title="Paella dish"
                                                />
                                                <CardContent>
                                                    <Typography variant="subtitle1" component="p" style={{ textAlign: 'center' }}>
                                                        Số 1/2018
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                    <Grid item md={4} sm={6} xs={12}>
                                        <Card>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image="/images/journal.jpg"
                                                    title="Paella dish"
                                                />
                                                <CardContent>
                                                    <Typography variant="subtitle1" component="p" style={{ textAlign: 'center' }}>
                                                        Số 1/2018
                                                </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>





                                </Grid>
                                <Grid container spacing={3} alignItems="center" justify="center">
                                    <Grid item sx={12}>
                                        <Pagination count={3} color="primary" />
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                Item Four
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                Item Five
                            </TabPanel>
                            <TabPanel value={value} index={5}>
                                2023
                            </TabPanel>
                        </div>
                    </Paper>
                </Grid>

            </Grid>
        </Container>
    );
}


export default ListJournal



function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    tab: {
        minWidth: 100,
        width: 100,
    },
    typo: {
        padding: '1rem',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center'
    },
    appbar: {
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '4rem',
    },
    media: {
        height: '18rem',
        minHeight: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'auto',
    },
}));