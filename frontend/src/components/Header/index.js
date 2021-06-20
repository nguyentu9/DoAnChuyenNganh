import {
    AppBar,
    CardMedia,
    Container,
    Grid,
    Paper,
    useMediaQuery,
} from '@material-ui/core';
import { ContactMail } from '@material-ui/icons';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BookIcon from '@material-ui/icons/Book';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import useStyles from './style';
import { useSelector } from 'react-redux';

const routes = [
    {
        title: 'Trang chủ',
        path: '/',
        icon: <HomeIcon />,
    },
    {
        title: 'Giới thiệu',
        path: '/gioi-thieu',
        icon: <AssignmentIndIcon />,
    },
    {
        title: 'Số tạp chí',
        path: '/so-tap-chi',
        icon: <BookIcon />,
    },
    {
        title: 'Quy định - Thể lệ',
        path: '/quy-dinh-the-le',
        icon: <MenuBookIcon />,
    },
    {
        title: 'Hướng dẫn',
        path: '/huong-dan',
        icon: <ChromeReaderModeIcon />,
    },
    {
        title: 'Liên hệ',
        path: '/lien-he',
        icon: <ContactMail />,
    },
    {
        title: 'Đăng nhập',
        path: '/dang-nhap',
        icon: <ExitToAppIcon />,
    },
];

function Header() {
    const token = useSelector(state => state.auth.token);
    const matches = useMediaQuery('(max-width:1155px)');
    const [toggleMenu, setToggleMenu] = useState(false);

    function handleToggleMenu() {
        setToggleMenu(!toggleMenu);
    }

    const classes = useStyles();
    return (
        <AppBar color='transparent' position='static' className={classes.app}>
            <Container>
                <Grid container className={classes.brand}>
                    <Grid item xs className={classes.grid}>
                        <Paper
                            elevation={0}
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <div style={{ width: '800px', margin: '0 auto' }}>
                                <Link to='/'>
                                    <CardMedia
                                        className={classes.logo}
                                        image='/images/TGULogo.jpg'
                                        alt='logo'
                                    />
                                </Link>
                            </div>
                            <div
                                style={{ paddingLeft: '2rem' }}
                                onClick={handleToggleMenu}
                            >
                                {
                                    // Show MenuIcon when width's screen <= 1155px
                                    matches && <MenuIcon />
                                }
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid
                    container
                    item
                    xs={12}
                    spacing={2}
                    direction='row'
                    justify='space-between'
                    className={
                        (classes.grid,
                        classes.listMenu,
                        toggleMenu || matches === false
                            ? classes.active
                            : classes.inactive)
                    }
                >
                    {routes.map((route, index) => {
                        return (
                            <Grid
                                item
                                className={(classes.grid, classes.menuItem)}
                                key={index}
                            >
                                <Paper elevation={0}>
                                    <NavLink
                                        exact
                                        className={classes.link}
                                        to={route.path}
                                        underline='none'
                                        activeStyle={{ color: '#3f51b5' }}
                                        onClick={handleToggleMenu}
                                    >
                                        {route.icon}
                                        {token !== null &&
                                        route.title === 'Đăng nhập'
                                            ? 'Bảng điều khiển'
                                            : route.title}
                                    </NavLink>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </AppBar>
    );
}

export default Header;
