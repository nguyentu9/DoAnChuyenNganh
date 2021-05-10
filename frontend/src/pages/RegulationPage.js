import { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import TabPanel from '../components/Common/TabPanel';

function Regulation() {
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
                <Tab className={classes.tab} label="Thể lệ gửi bài" {...a11yProps(0)} />
                <Tab className={classes.tab} label="Chính sách biên tập" {...a11yProps(1)} />
                <Tab className={classes.tab} label="Thể lệ xuất bản" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                Thể lệ gửi bài
            </TabPanel>
            <TabPanel value={value} index={1}>
                Chính sách biên tập
            </TabPanel>
            <TabPanel value={value} index={2}>
                Thể lệ xuất bản
            </TabPanel>
        </div>
    );
}

export default Regulation



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
            justifyContent: 'center',
        },
        [theme.breakpoints.down('md')]: {
            "& .MuiTabs-flexContainer": {
                width: '30rem'
            },
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