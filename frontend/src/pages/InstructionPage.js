import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Tab, Tabs} from '@material-ui/core';
import React, {useState} from 'react';
import TabPanel from '../components/TabPanel';

function Instruction() {
    const classes = useStyles();
    const matches = useMediaQuery('(max-width:1280px)');
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation={matches ? "horizontal" : "vertical"}
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
                textColor="primary"
                indicatorColor="primary"
                scrollButtons="on"
            >
                <Tab className={classes.tab} label="Hướng dẫn gửi bài báo" {...a11yProps(0)} />
                <Tab className={classes.tab} label="Hướng dẫn tác giả" {...a11yProps(1)} />
                <Tab className={classes.tab} label="Hướng dẫn phản biện" {...a11yProps(2)} />
                <Tab className={classes.tab} label="Hướng dẫn biên tập" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                Hướng dẫn gửi bài báo
            </TabPanel>
            <TabPanel value={value} index={1}>
                Hướng dẫn tác giả
            </TabPanel>
            <TabPanel value={value} index={2}>
                Hướng dẫn phản biện
            </TabPanel>
            <TabPanel value={value} index={3}>
                Hướng dẫn biên tập
            </TabPanel>
        </div>
    );
}

export default Instruction

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            display: 'unset',
        }
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        minWidth: '12rem',
        "& .MuiTabs-flexContainer": {
            display: 'flex',
            justifyContent:'center!important'
        }
    },
    tab: {
        fontWeight: '600'
    }
}));

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}