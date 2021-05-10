import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, {useState} from 'react';
import TabPanel from '../components/Common/TabPanel';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function Introduce() {
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
                <Tab className={classes.tab} label="Giới thiệu tạp chí" {...a11yProps(0)} />
                <Tab className={classes.tab} label="Phạm vi mục đích" {...a11yProps(1)} />
                <Tab className={classes.tab} label="Hội đồng biên tập" {...a11yProps(2)} />
                <Tab className={classes.tab} label="Nhân sự tạp chí" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <div>
                    **Tên gọi**
                    <ul>
                        <li>1. Tạp chí Khoa học Trường Đại học Tiền Giang được Bộ Thông tin và Truyền thông cấp Giấy phép số 358/GP-BTTTT ngày 04/9/2013</li>
                        <li>2. Tên tiếng Việt: Tạp chí Khoa học Trường Đại học Tiền Giang</li>
                        <li>3. Tên tiếng Anh: Journal ò Science, Tien Giang University</li>
                        <li>4. Mã số ISSN: 1859-4530</li>
                        <li>5. Cơ quan chủ quản: Trường Đại học Tiền Giang</li>
                    </ul>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two 2
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
        </div>
    );
}

export default Introduce



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
            justifyContent:'center',
        },
        [theme.breakpoints.down('md')]: {
            "& .MuiTabs-flexContainer": {
                width:'40rem'
            },
        }
    },
    tab: {
        fontWeight: '600'
    }
}));