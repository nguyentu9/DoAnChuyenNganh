import { Grid, Paper } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import TabPanel from '../../../components/TabPanel';
import TableArticle from './TableArticle';

const Books = () => <div style={{ minHeight: '40vh' }}>Books</div>;
const Favorites = () => <div>Favorites</div>;

// const routes = [
//     '/bien-tap/quan-ly-bai-bao/aaa',
//     '/bien-tap/quan-ly-bai-bao/bbb',
// ];
function ListJournal() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                {/* <Route
                    path='/'
                    render={history => (
                        <AppBar position='static' color='transparent'>
                            <Tabs
                                onChange={handleChange}
                                indicatorColor='primary'
                                textColor='primary'
                                variant='scrollable'
                                scrollButtons='on'
                                value={
                                    history.location.pathname !== '/'
                                        ? history.location.pathname
                                        : false
                                }
                            >
                                {console.log(history.location.pathname)}
                                <Tab
                                    classes={{ root: classes.tab }}
                                    value={routes[0]}
                                    label='books'
                                    component={Link}
                                    to={routes[0]}
                                />
                                <Tab
                                    classes={{ root: classes.tab }}
                                    value={routes[1]}
                                    label='Favorites'
                                    component={Link}
                                    to={routes[1]}
                                />
                            </Tabs>
                        </AppBar>
                    )}
                />

                <Switch>
                    <Route
                        path='/bien-tap/quan-ly-bai-bao/aaa'
                        component={Books}
                    />
                    <Route
                        path='/bien-tap/quan-ly-bai-bao/bbb'
                        component={Favorites}
                    />
                </Switch> */}

                <Paper elevation={0}>
                    <div className={classes.root}>
                        <AppBar
                            position='static'
                            color='transparent'
                            elevation={0}
                        >
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor='primary'
                                textColor='primary'
                                variant='scrollable'
                                scrollButtons='on'
                            >
                                <Tab
                                    label='Danh sách bài báo chờ phản biện'
                                    classes={{ root: classes.tab }}
                                />
                                <Tab
                                    label='Tổng hợp kết quả phản biện'
                                    classes={{ root: classes.tab }}
                                />
                                <Tab
                                    label='Danh sách bài báo đã chỉnh sửa'
                                    classes={{ root: classes.tab }}
                                />
                                <Tab
                                    label='Danh sách bài báo hoàn thành'
                                    classes={{ root: classes.tab }}
                                />
                                <Tab
                                    label='Danh sách bài báo phản biện lại'
                                    classes={{ root: classes.tab }}
                                />
                                <Tab
                                    label='Tất cả bài báo'
                                    classes={{ root: classes.tab }}
                                />
                            </Tabs>
                        </AppBar>

                        <TabPanel value={value} index={0}>
                            <TableArticle />
                            {/* <Grid
                                container
                                spacing={2}
                                alignItems='center'
                                justify='center'
                            >
                                <Grid item md={4} sm={6} xs={12}></Grid>
                                <Grid item md={4} sm={6} xs={12}></Grid>
                                <Grid item md={4} sm={6} xs={12}></Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={3}
                                alignItems='center'
                                justify='center'
                            >
                                <Grid item sx={12}>
                                    <Pagination count={3} color='primary' />
                                </Grid>
                            </Grid> */}
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
    );
}

export default ListJournal;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    tab: {
        minWidth: 100,
        maxWidth: 200,
    },
    typo: {
        padding: '0.8rem',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
    },
    appbar: {
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '5rem',
    },
}));
