import {
    Avatar,
    Menu,
    MenuItem,
    AppBar,
    Badge,
    Container,
    Divider,
    Drawer,
    Grid,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { Route, Switch, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'classnames';
import React, { useState } from 'react';
import ListMenu from './ListMenu';
import Orders from './TableArticle';
import SendArticle from './Author/SendArticle';
import ListSendedArticle from './Author/ListSendedArticle';
import ManageArticle from './Editor/ManageArticle';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth';
// import CoutingArticle from './CoutingArticle';
const drawerWidth = 240;

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

export default function Dashboard() {
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

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
                        Dashboard
                    </Typography>
                    <IconButton color='inherit'>
                        <Badge badgeContent={4} color='secondary'>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton onClick={handleMenu}>
                        <Avatar>T</Avatar>
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
                        onClose={handleClose}
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
                        <Route exact path='/tac-gia/gui-bai-bao'>
                            <SendArticle />
                        </Route>

                        <Route exact path='/tac-gia/tat-ca-bai-bao'>
                            <Grid container spacing={3}>
                                {/* <Grid item xs={12}>
                                    <Paper className={fixedHeightPaper}>
                                        <CoutingArticle />
                                    </Paper>
                                </Grid> */}

                                <Grid item xs={12}>
                                    <Orders />
                                </Grid>
                            </Grid>
                        </Route>

                        <Route exact path='/tac-gia/bai-bao-da-gui'>
                            <ListSendedArticle />
                        </Route>

                        <Route exact path='/tac-gia/xem-phan-bien' />

                        <Route exact path='/phan-bien/phan-bien-bai-bao' />

                        <Route exact path='/phan-bien/chap-nhan-chinh-sua' />
                        <Route exact path='/phan-bien/bai-bao-da-phan-bien' />

                        <Route
                            exact
                            path='/bien-tap/quan-ly-bai-bao'
                            component={ManageArticle}
                        />
                        <Route exact path='/bien-tap/quan-ly-tap-chi' />
                        <Route exact path='/bien-tap/quan-ly-tai-khoan' />
                        <Route path='/bien-tap/giao-dien' />
                    </Switch>
                </Container>
            </main>
        </div>
    );
}
