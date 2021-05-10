import { Collapse, List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarBorder from '@material-ui/icons/StarBorder';
import React from 'react';


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
                    <ListItem button style={{ paddingLeft: '1.2rem' }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Tất cả bài báo" />
                    </ListItem>
                    <ListItem button style={{ paddingLeft: '1.2rem' }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Bài báo đã gửi" />
                    </ListItem>
                    <ListItem button style={{ paddingLeft: '1.2rem' }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Xem phản biện" />
                    </ListItem>
                    <ListItem button style={{ paddingLeft: '1.2rem' }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Xem phản hồi" />
                    </ListItem>
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
                    <ListItem button style={{ paddingLeft: '1.2rem' }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Phản biện bài báo" />
                    </ListItem>
                    <ListItem button style={{ paddingLeft: '1.2rem' }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Chấp nhận chỉnh sửa" />
                    </ListItem>
                    <ListItem button style={{ paddingLeft: '1.2rem' }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Bài báo đã phản biện" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    )
}


export default ListMenu