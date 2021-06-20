import {
    AppBar,
    Avatar,
    Badge,
    Container,
    Divider,
    Drawer,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'classnames';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { logout } from '../../redux/auth';
import ArticleDetail from './ArticleDetail';
import ArticleSubmissionForm from './Author/ArticleSubmissionForm/index';
import ListArticles from './Author/ListArticles/index';
import ListArticlesSubmitted from './Author/ListArticlesSubmitted/index';

import ArticleManagement from './Editor/ArticleManagement/index';
import JournalManagement from './Editor/JournalManagement/index';
import LayoutManagement from './Editor/LayoutManagement/index';
import UserManagement from './Editor/UserManagement/index';
import ListMenu from './ListMenu';
const drawerWidth = 240;

function Dashboard() {
    const userFullName = useSelector(state => state.auth.fullName);
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    let firstName = userFullName.split('').reverse()[0];
    const openMenu = Boolean(anchorEl);
    const handleClose = btn => _ => {
        if (btn === 'logout') {
            dispatch(logout());
            history.push('/');
        }
        if (btn === 'profile') {
        }
        setAnchorEl(null);
    };
    const handleMenu = e => {
        setAnchorEl(e.currentTarget);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <AppBar
                position='absolute'
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component='h1'
                        variant='h6'
                        color='inherit'
                        noWrap
                        className={classes.title}
                    >
                        Bảng điều khiển
                    </Typography>
                    <IconButton color='inherit'>
                        <Badge badgeContent={4} color='secondary'>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton onClick={handleMenu}>
                        <Avatar>{firstName?.[0] || 'AD'}</Avatar>
                    </IconButton>
                    <Menu
                        id='menu-appbar'
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={openMenu}
                        onClose={handleClose()}
                    >
                        <MenuItem onClick={handleClose('profile')}>
                            Thông tin cá nhân
                        </MenuItem>
                        <MenuItem onClick={handleClose('logout')}>
                            Đăng xuất
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
                variant='permanent'
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose
                    ),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <ListMenu />
            </Drawer>

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth='lg' className={classes.container}>
                    <Switch>
                        <Route
                            exact
                            path='/tac-gia/gui-bai-bao'
                            component={ArticleSubmissionForm}
                        />

                        <Route
                            exact
                            path='/tac-gia/tat-ca-bai-bao'
                            component={ListArticles}
                        />

                        <Route
                            exact
                            path='/tac-gia/bai-bao-da-gui'
                            component={ListArticlesSubmitted}
                        />

                        <Route exact path='/tac-gia/xem-phan-bien' />
                        <Route
                            exact
                            path='/tac-gia/bai-bao/:articleID'
                            component={ArticleDetail}
                        />

                        <Route exact path='/phan-bien/phan-bien-bai-bao' />

                        <Route exact path='/phan-bien/chap-nhan-chinh-sua' />
                        <Route exact path='/phan-bien/bai-bao-da-phan-bien' />

                        <Route
                            exact
                            path='/bien-tap/quan-ly-bai-bao'
                            component={ArticleManagement}
                        />
                        <Route
                            exact
                            path='/bien-tap/bai-bao/:articleID'
                            component={ArticleDetail}
                        />
                        <Route
                            exact
                            path='/bien-tap/quan-ly-tap-chi'
                            component={JournalManagement}
                        />
                        <Route
                            exact
                            path='/bien-tap/quan-ly-tai-khoan'
                            component={UserManagement}
                        />
                        <Route
                            exact
                            path='/bien-tap/giao-dien'
                            component={LayoutManagement}
                        />
                    </Switch>
                </Container>
            </main>
        </div>
    );
}
export default Dashboard;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 150,
    },
}));
