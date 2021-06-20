import {
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import SendIcon from '@material-ui/icons/Send';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import RestorePageOutlinedIcon from '@material-ui/icons/RestorePageOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import PictureInPictureOutlinedIcon from '@material-ui/icons/PictureInPictureOutlined';
import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(theme => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontWeight: 'bold',
        color: '#000',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#EEE',
        },
    },
}));

const authorNavLinks = [
    {
        to: '/tac-gia/gui-bai-bao',
        label: 'Gửi bài báo',
        icon: <SendIcon />,
    },
    {
        to: '/tac-gia/tat-ca-bai-bao',
        label: 'Tất cả bài báo',
        icon: <ListAltIcon />,
    },
    {
        to: '/tac-gia/bai-bao-da-gui',
        label: 'Bài báo đã gửi',
        icon: <PlaylistAddCheckIcon />,
    },

    {
        to: '/tac-gia/xem-phan-bien',
        label: 'Xem phản biện',
        icon: <PageviewOutlinedIcon />,
    },
];

const reviewerNavLinks = [
    {
        to: '/phan-bien/phan-bien-bai-bao',
        label: 'Phản biện bài báo',
        icon: <FeedbackOutlinedIcon />,
    },
    {
        to: '/phan-bien/chap-nhan-chinh-sua',
        label: 'Chấp nhận chỉnh sửa',
        icon: <RestorePageOutlinedIcon />,
    },
    {
        to: '/phan-bien/bai-bao-da-phan-bien',
        label: 'Bài báo đã phản biện',
        icon: <AssignmentTurnedInOutlinedIcon />,
    },
];

const editorNavLinks = [
    {
        to: '/bien-tap/quan-ly-bai-bao',
        label: 'Quản lý bài báo',
        icon: <ListAltIcon />,
    },
    {
        to: '/bien-tap/quan-ly-tap-chi',
        label: 'Quản lý tạp chí',
        icon: <BookOutlinedIcon />,
    },
    {
        to: '/bien-tap/quan-ly-tai-khoan',
        label: 'Quản lý tài khoản',
        icon: <AccountBoxOutlinedIcon />,
    },
    {
        to: '/bien-tap/giao-dien',
        label: 'Giao diện',
        icon: <PictureInPictureOutlinedIcon />,
    },
];

function ListMenu() {
    const classes = useStyles();

    const [authorOpen, setauthorOpen] = useState(true);
    const [reviewerOpen, setreviewerOpen] = useState(false);
    const [editorOpen, seteditorOpen] = useState(true);

    const isAdmin = useSelector(state => state.auth.isAdmin);
    const menu = useSelector(state => state.auth.menu);
    const token = useSelector(state => state.auth.token);

    const handleClick = usr => () => {
        if (usr === 'author') setauthorOpen(!authorOpen);
        if (usr === 'reviewer') setreviewerOpen(!reviewerOpen);
        if (usr === 'editor') seteditorOpen(!editorOpen);
    };
    return (
        <List>
            {(isAdmin == null || token == null) && <Redirect to='/dang-nhap' />}

            {isAdmin && menu === 'admin' ? (
                <>
                    <ListItem button onClick={handleClick('editor')}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={
                                <Typography
                                    type='body2'
                                    style={{ color: '#000', fontWeight: '500' }}
                                >
                                    Biên tập
                                </Typography>
                            }
                        />
                        {editorOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={editorOpen} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            {editorNavLinks.map(link => (
                                <NavLink
                                    exact
                                    key={link.label}
                                    className={classes.link}
                                    to={link.to}
                                    underline='none'
                                    activeStyle={{
                                        color: '#3f51b5',
                                        backgroundColor: '#EEE',
                                    }}
                                >
                                    <ListItem
                                        button
                                        style={{ paddingLeft: '1.2rem' }}
                                    >
                                        <ListItemIcon>{link.icon}</ListItemIcon>
                                        <ListItemText primary={link.label} />
                                    </ListItem>
                                </NavLink>
                            ))}
                        </List>
                    </Collapse>
                </>
            ) : (
                <>
                    <ListItem button onClick={handleClick('author')}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={
                                <Typography
                                    type='body2'
                                    style={{ color: '#000', fontWeight: '500' }}
                                >
                                    Tác giả
                                </Typography>
                            }
                        />
                        {authorOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={authorOpen} timeout='auto' icon={PersonIcon}>
                        <List component='div' disablePadding>
                            {authorNavLinks.map(link => (
                                <NavLink
                                    exact
                                    key={link.label}
                                    className={classes.link}
                                    to={link.to}
                                    underline='none'
                                    activeStyle={{
                                        color: '#3f51b5',
                                        backgroundColor: '#EEE',
                                    }}
                                >
                                    <ListItem
                                        button
                                        style={{ paddingLeft: '1.2rem' }}
                                    >
                                        <ListItemIcon>{link.icon}</ListItemIcon>
                                        <ListItemText primary={link.label} />
                                    </ListItem>
                                </NavLink>
                            ))}
                        </List>
                    </Collapse>

                    <ListItem button onClick={handleClick('reviewer')}>
                        <ListItemIcon>
                            <SupervisorAccountIcon />
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={
                                <Typography
                                    type='body2'
                                    style={{ color: '#000', fontWeight: '500' }}
                                >
                                    Phản biện
                                </Typography>
                            }
                        />
                        {reviewerOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={reviewerOpen} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            {reviewerNavLinks.map(link => (
                                <NavLink
                                    key={link.label}
                                    exact
                                    className={classes.link}
                                    to={link.to}
                                    underline='none'
                                    activeStyle={{
                                        color: '#3f51b5',
                                        backgroundColor: '#EEE',
                                    }}
                                >
                                    <ListItem
                                        button
                                        style={{ paddingLeft: '1.2rem' }}
                                    >
                                        <ListItemIcon>{link.icon}</ListItemIcon>
                                        <ListItemText primary={link.label} />
                                    </ListItem>
                                </NavLink>
                            ))}
                        </List>
                    </Collapse>
                </>
            )}
        </List>
    );
}

export default ListMenu;
