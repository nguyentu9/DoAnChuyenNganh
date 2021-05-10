import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
    grid: {
        alignItems: "center"
    },
    logo: {
        maxWidth: '100%',
        width: '100%',
        height: "100px",
        margin: "0 auto",
        backgroundSize: 'contain'
    },
    link: {
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontWeight: 'bold',
        color: '#65676b',
        cursor: 'pointer',
        padding: '1rem',
        margin: '.5rem 0',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: '#EEE'
        },
        [theme.breakpoints.down(1155)]: {
            minWidth: '100%',
        },
    },
    app: {
        marginBottom: "2.5rem",
    },
    selected: {
        color: '#0000ff85'
    },
    brand: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '1rem',
        userSelect: 'none'
    },
    listMenu: {
        [theme.breakpoints.down(1155)]: {
            display:'none',
            flexDirection: 'column',
            alignItems: 'center',
            transition:'all .3s ease-in',
        },
        [theme.breakpoints.up(1155)]: {
            display:'flex',
        }
    },
    active: {
        display: 'flex',
    },
    inactive: {
        display: 'none'
    },
    menuItem: {
        [theme.breakpoints.down(1155)]: {
            width: '100%',
            display: 'flex',
            justifyContent:'center',
            height:'5rem',
        },
    }
}))