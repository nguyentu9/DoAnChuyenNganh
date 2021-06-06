import { Collapse, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';
import SendIcon from '@material-ui/icons/Send';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import RestorePageOutlinedIcon from '@material-ui/icons/RestorePageOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
// import PreviewIcon from '@material-ui/icons/Preview';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontWeight: 'bold',
        color: '#000',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#EEE'
        },
    },
    active: {

    }
}))
function ListMenu() {
    const classes = useStyles();
    const [authorOpen, setauthorOpen] = React.useState(true);
    const [appraiserOpen, setappraiserOpen] = React.useState(false);

    const handleAuthorClick = () => {
        setauthorOpen(!authorOpen);
    };

    const handleAppraiseClick = () => {
        setappraiserOpen(!appraiserOpen);
    };
    return (
        <List>
            <ListItem button onClick={handleAuthorClick}>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={<Typography type="body2" style={{ color: '#000', fontWeight: '500' }}>Tác giả</Typography>}
                />
                {authorOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={authorOpen} timeout="auto" icon={PersonIcon}>
                <List component="div" disablePadding>
                    <NavLink
                        exact
                        className={classes.link}
                        to='/tac-gia/gui-bai-bao'
                        underline="none"
                        activeStyle={{ color: "#3f51b5", backgroundColor: "#EEE" }}
                    >
                        <ListItem
                            button
                            style={{ paddingLeft: '1.2rem' }}
                        >
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText primary="Gửi bài báo" />
                        </ListItem>
                    </NavLink>


                    <NavLink
                        exact
                        className={classes.link}
                        to='/tac-gia/tat-ca-bai-bao'
                        underline="none"
                        activeStyle={{ color: "#3f51b5", backgroundColor: "#EEE" }}
                    >
                        <ListItem button style={{ paddingLeft: '1.2rem' }}>
                            <ListItemIcon>
                                <ListAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tất cả bài báo" />
                        </ListItem>
                    </NavLink>

                    <NavLink
                        exact
                        className={classes.link}
                        to='/tac-gia/bai-bao-da-gui'
                        underline="none"
                        activeStyle={{ color: "#3f51b5", backgroundColor: "#EEE" }}
                    >
                        <ListItem button style={{ paddingLeft: '1.2rem' }}>
                            <ListItemIcon>
                                <PlaylistAddCheckIcon />
                            </ListItemIcon>
                            <ListItemText primary="Bài báo đã gửi" />
                        </ListItem>
                    </NavLink>

                    <NavLink
                        exact
                        className={classes.link}
                        to='/tac-gia/xem-phan-bien'
                        underline="none"
                        activeStyle={{ color: "#3f51b5", backgroundColor: "#EEE" }}
                    >
                        <ListItem button style={{ paddingLeft: '1.2rem' }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Xem phản biện" />
                        </ListItem>
                    </NavLink>
                </List>
            </Collapse>

            <ListItem button onClick={handleAppraiseClick}>
                <ListItemIcon>
                    <SupervisorAccountIcon />
                </ListItemIcon>
                <ListItemText 
                    disableTypography
                    primary={<Typography type="body2" style={{ color: '#000', fontWeight: '500' }}>Phản biện</Typography>}
                 />
                {appraiserOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={appraiserOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <NavLink
                        exact
                        className={classes.link}
                        to='/phan-bien/phan-bien-bai-bao'
                        underline="none"
                        activeStyle={{ color: "#3f51b5", backgroundColor: "#EEE" }}
                    >
                        <ListItem button style={{ paddingLeft: '1.2rem' }}>
                            <ListItemIcon>
                                <FeedbackOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Phản biện bài báo" />
                        </ListItem>
                    </NavLink>


                    <NavLink
                        exact
                        className={classes.link}
                        to='/phan-bien/chap-nhan-chinh-sua'
                        underline="none"
                        activeStyle={{ color: "#3f51b5", backgroundColor: "#EEE" }}
                    >
                        <ListItem button style={{ paddingLeft: '1.2rem' }}>
                            <ListItemIcon>
                                <RestorePageOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chấp nhận chỉnh sửa" />
                        </ListItem>
                    </NavLink>

                    <NavLink
                        exact
                        className={classes.link}
                        to='/phan-bien/bai-bao-da-phan-bien'
                        underline="none"
                        activeStyle={{ color: "#3f51b5", backgroundColor: "#EEE" }}
                    >
                        <ListItem button style={{ paddingLeft: '1.2rem' }}>
                            <ListItemIcon>
                                <AssignmentTurnedInOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Bài báo đã phản biện" />
                        </ListItem>
                    </NavLink>
                </List>
            </Collapse>
        </List>
    )
}


export default ListMenu