import { AppBar, Box, Grid, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import articleApi from '../../../../api/articleApi';
import { logout } from '../../../../redux/auth';
import TableArticle from '../../TableArticle';
const tabs = [
    {
        id: 0,
        label: 'Danh sách bài báo chờ phản biện',
        component: props => <TableArticle {...props} />,
    },
    {
        id: 1,
        label: 'Danh sách bài báo đã chỉnh sửa',
        component: props => <TableArticle {...props} />,
    },
    {
        id: 2,
        label: 'Danh sách bài báo hoàn thành',
        component: props => <TableArticle {...props} />,
    },
    {
        id: 3,
        label: 'Danh sách bài báo phản biện lại',
        component: props => <TableArticle {...props} />,
    },
    {
        id: 4,
        label: 'Tất cả bài báo',
        component: props => <TableArticle {...props} />,
    },
];

const params = [
    { status: 'pending' },
    { status: 'revised' },
    { status: 'published' },
    { status: 'disagree' },
    { status: 'all' },
];

function ArticleManagement() {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        async function fetchAllArticle() {
            try {
                const data = await articleApi.getAllWithUser(
                    'editor',
                    params[tabIndex]
                );
                if (data?.status === 401) {
                    dispatch(logout());
                    return history.replace('/dang-nhap');
                }
                setArticles(data);
            } catch (e) {
                dispatch(logout());
                return history.replace('/dang-nhap');
            }
        }
        fetchAllArticle();
    }, [tabIndex]);

    const handleTabChange = (_, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <div className={classes.root}>
                    <AppBar position='static' color='transparent' elevation={0}>
                        <Tabs
                            value={tabIndex}
                            onChange={handleTabChange}
                            indicatorColor='primary'
                            textColor='primary'
                            variant='scrollable'
                            scrollButtons='on'
                        >
                            {tabs.map((tab, i) => (
                                <Tab
                                    key={i}
                                    label={tab.label}
                                    classes={{ root: classes.tab }}
                                />
                            ))}
                        </Tabs>
                    </AppBar>
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            role='tabpanel'
                            hidden={tab.id !== index}
                            id={`vertical-tabpanel-${index}`}
                            aria-labelledby={`vertical-tab-${index}`}
                        >
                            {tabIndex === index && (
                                <Box p={2} ml={2}>
                                    {tab.component({ articles })}
                                </Box>
                            )}
                        </div>
                    ))}
                </div>
            </Grid>
        </Grid>
    );
}

export default ArticleManagement;

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
}));
