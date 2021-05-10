import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">My sticky footer can be found here.</Typography>
                </Container>
            </footer>
        </div>
    );
}

export default Footer;



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: '2.5rem',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));