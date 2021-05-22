import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarBorder from '@material-ui/icons/StarBorder';
import React from 'react';
import { NavLink } from 'react-router-dom';

function ListMenu() {
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
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Tác giả" />
                {authorOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={authorOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <NavLink
                        exact
                        // className={classes.link}
                        to='/tac-gia/gui-bai-bao'
                        underline="none"

                        activeStyle={{ color: "#3f51b5" }}
                    >
                        <ListItem
                            button
                            style={{ paddingLeft: '1.2rem' }}
                        // selected={true}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Gửi bài báo" />
                        </ListItem>
                    </NavLink>


                    <NavLink
                        exact
                        // className={classes.link}
                        to='/tac-gia/tat-ca-bai-bao'
                        underline="none"
                        activeStyle={{ color: "#3f51b5" }}
                    >
                        <ListItem button style={{ paddingLeft: '1.2rem' }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Tất cả bài báo" />
                        </ListItem>
                    </NavLink>

                    <NavLink
                        exact
                        // className={classes.link}
                        to='/tac-gia/bai-bao-da-gui'
                        underline="none"
                        activeStyle={{ color: "#3f51b5" }}
                    >
                        <ListItem button style={{ paddingLeft: '1.2rem' }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Bài báo đã gửi" />
                        </ListItem>
                    </NavLink>

                    <NavLink
                        exact
                        // className={classes.link}
                        to='/tac-gia/xem-phan-bien'
                        underline="none"
                        activeStyle={{ color: "#3f51b5" }}
                    >
                        <ListItem button style={{ paddingLeft: '1.2rem' }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Xem phản biện" />
                        </ListItem>
                    </NavLink>
                </List>
            </Collapse>

            <ListItem button onClick={handleAppraiseClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Phản biện" />
                {appraiserOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={appraiserOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <NavLink
                        exact
                        // className={classes.link}
                        to='/phan-bien/phan-bien-bai-bao'
                        underline="none"
                        activeStyle={{ color: "#3f51b5" }}
                    >
                        <ListItem button style={{ paddingLeft: '1.2rem' }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Phản biện bài báo" />
                        </ListItem>
                    </NavLink>


                    <NavLink
                        exact
                        // className={classes.link}
                        to='/phan-bien/chap-nhan-chinh-sua'
                        underline="none"
                        activeStyle={{ color: "#3f51b5" }}
                    >
                        <ListItem button style={{ paddingLeft: '1.2rem' }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Chấp nhận chỉnh sửa" />
                        </ListItem>
                    </NavLink>

                    <NavLink
                        exact
                        // className={classes.link}
                        to='/phan-bien/bai-bao-da-phan-bien'
                        underline="none"
                        activeStyle={{ color: "#3f51b5" }}
                    >
                        <ListItem button style={{ paddingLeft: '1.2rem' }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Bài báo đã phản biện" />
                        </ListItem>
                    </NavLink>
                </List>
            </Collapse>
        </List>
    )
}


export default ListMenu